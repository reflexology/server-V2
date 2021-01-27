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
    aggregate.push({ $unwind: { path: '$treatments', preserveNullAndEmptyArrays: true } });
    aggregate.push({ $match: { 'treatments.isDeleted': null } });

    aggregate.push(
      {
        $group: {
          _id: '$_id',
          person: { $first: '$$ROOT' },
          treatments: { $push: '$treatments' }
        }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ['$person', { treatments: '$treatments' }] } }
      }
    );

    aggregate.push({
      $addFields: {
        balance: {
          $subtract: [{ $sum: '$treatments.paidPrice' }, { $sum: '$treatments.treatmentPrice' }]
        }
      }
    });

    if (inDebt || inCredit)
      aggregate.push({
        $match: {
          balance: { [inDebtOrInCreditOperator]: 0 }
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
          balance: 1,
          childrenAges: 1,
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
    return this.model.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(patientId) } },
      { $unwind: '$treatments' },
      { $match: { 'treatments.isDeleted': null } },
      { $sort: { 'treatments.treatmentDate': -1 } },
      {
        $group: {
          _id: { id: '$_id' },
          treatments: { $push: '$treatments' }
        }
      },
      { $project: { treatments: 1, _id: -1 } }
    ]);
  }

  async addTreatment(patientId: string, treatment: ITreatment) {
    const patient = await this.getOneById(patientId);
    patient.treatments.push(treatment);

    return patient.save();
  }

  async getTreatmentById(treatmentId: string) {
    return Patient.findOne({ 'treatments._id': treatmentId }, { 'treatments.$': 1 });
  }

  async getPatientByTreatmentId(treatmentId: string) {
    return Patient.findOne({ 'treatments._id': treatmentId }, { treatments: 0, __v: 0 });
  }

  /**
   *
   * @return new treatment
   */
  async updateTreatment(treatmentId: string, treatment: Partial<ITreatment>) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    const oldTreatment = patient.treatments.id(treatmentId);
    oldTreatment.set({ ...oldTreatment.toObject(), ...treatment });

    return patient.save();
  }

  markRemindersAsCompleted(treatmentIds: string[]) {
    return this.model.updateMany(
      { 'treatments._id': treatmentIds },
      { $set: { 'treatments.$[].isReminderCompleted': true } }
    );
  }

  async deleteTreatment(treatmentId: string) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    const treatment = patient.treatments.id(treatmentId);
    treatment.set({ isDeleted: true });
    await patient.save();

    return treatment;
  }

  // reminders operations

  async getAllReminders(userId: string, newReminders: boolean) {
    const aggregate: Record<string, unknown>[] = [];

    aggregate.push(
      { $unwind: '$treatments' },
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(userId),
          'treatments.reminderDate': newReminders ? { $lte: new Date() } : { $ne: null },
          ...(newReminders && { 'treatments.isReminderCompleted': { $eq: false } })
        }
      },
      { $sort: { 'treatments.reminderDate': -1 } },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          momName: 1,
          'treatments._id': 1,
          'treatments.reminderDate': 1,
          'treatments.reminders': 1,
          'treatments.isReminderCompleted': 1
        }
      }
    );

    return Patient.aggregate(aggregate);
  }
}

export default PatientRepository;
