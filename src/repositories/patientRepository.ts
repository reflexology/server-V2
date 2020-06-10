import mongoose from 'mongoose';

import Patient, { IPatient, IPatientDocument } from '../models/patientModel';
import { ITreatment } from '../models/treatmentModel';
import BaseRepository from './baseRepository';

class PatientRepository extends BaseRepository<IPatientDocument, IPatient> {
  constructor() {
    super(Patient);
  }

  getAllByUser(userId: string, inDebt: boolean, inCredit: boolean) {
    const aggregate: Record<string, unknown>[] = [];
    const inDebtOrInCreditOperator = inCredit ? '$gt' : '$lt';

    aggregate.push({ $match: { createdBy: mongoose.Types.ObjectId(userId) } });

    if (inDebt || inCredit)
      aggregate.push({
        $match: {
          $expr: {
            [inDebtOrInCreditOperator]: [{ $sum: '$treatments.paidPrice' }, { $sum: '$treatments.treatmentPrice' }]
          }
        }
      });

    aggregate.push(
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          momName: 1,
          birthday: 1,
          age: 1,
          phone: 1,
          email: 1,
          childrenCount: 1,
          gender: 1,
          maritalStatus: 1,
          createdBy: 1,
          createdAt: 1,
          lastTreatment: { $max: '$treatments.treatmentDate' },
          diagnoses: {
            $reduce: {
              input: '$treatments',
              initialValue: [],
              in: { $setUnion: ['$$value', '$$this.diagnoses'] }
            }
          }
        }
      },
      { $sort: { lastTreatment: -1 } }
    );

    return Patient.aggregate(aggregate);
  }

  // treatments operations

  getTreatmentsByPatientId(patientId: string) {
    return this.getOneById(patientId, { treatments: 1, _id: 0 });
  }

  async addTreatment(patientId: string, treatment: ITreatment) {
    const patient = await this.getOneById(patientId);
    patient.treatments.push(treatment);

    return patient.save();
  }

  async getTreatmentById(treatmentId: string) {
    return Patient.findOne({ 'treatments._id': treatmentId }, { 'treatments.$': 1 });
  }

  async updateTreatment(treatmentId: string, treatment: Partial<ITreatment>) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    const oldTreatment = patient.treatments.id(treatmentId);
    oldTreatment.set({ ...oldTreatment.toObject(), ...treatment });

    return patient.save();
  }

  async deleteTreatment(treatmentId: string) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    patient.treatments.id(treatmentId).remove();
    return patient.save();
  }
}

export default PatientRepository;
