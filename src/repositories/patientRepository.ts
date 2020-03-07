import Patient, { IPatient, IPatientDocument } from '../models/patientModel';
import BaseRepository from './baseRepository';
import Consts from '../utils/consts';
import { ITreatment } from '../models/treatmentModel';
import mongoose from 'mongoose';

class PatientRepository extends BaseRepository<IPatientDocument, IPatient> {
  constructor() {
    super(Patient);
  }

  async addTreatment(patientId: string, treatment: ITreatment) {
    const patient = await this.getOneById(patientId);
    patient.treatments.push(treatment);
    return patient.save();
  }

  async getTreatmentById(treatmentId: string) {
    return Patient.findOne({ 'treatments._id': mongoose.Types.ObjectId(treatmentId) }, { 'treatments.$': 1 });
  }

  getAllByUser(userId: string) {
    return Patient.find({ createdBy: userId });
  }

  async updateTreatment(treatmentId: string, treatment: Partial<ITreatment>) {
    const patient = await Patient.findOne({ 'treatments._id': mongoose.Types.ObjectId(treatmentId) });
    const oldTreatment = patient.treatments.id(treatmentId);
    oldTreatment.set({ ...oldTreatment.toObject(), ...treatment });
    return patient.save();
  }

  async deleteTreatment(treatmentId: string) {
    const patient = await Patient.findOne({ 'treatments._id': mongoose.Types.ObjectId(treatmentId) });
    patient.treatments.id(treatmentId).remove();
    return patient.save();
  }

  // TODO refactor
  // async updateLastTreatment(patientId: string, date: Date) {
  //   const patient = await this.getOneById(patientId);

  //   if (!patient.lastTreatment) patient.lastTreatment = date;
  //   else {
  //     const lastTreatment = await Treatment.findOne({ patientId: patient._id }, 'treatmentDate', {
  //       sort: { date: -1 } //Sort by Date Added DESC
  //     });

  //     patient.lastTreatment = lastTreatment.treatmentDate;
  //   }
  //   return patient.save();
  // }
}

export default PatientRepository;
