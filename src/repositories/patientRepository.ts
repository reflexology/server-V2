import Patient, { IPatient, IPatientDocument } from '../models/patientModel';
import BaseRepository from './baseRepository';
import { ITreatment } from '../models/treatmentModel';

class PatientRepository extends BaseRepository<IPatientDocument, IPatient> {
  constructor() {
    super(Patient);
  }

  getAllByUser(userId: string) {
    return Patient.find({ createdBy: userId });
  }

  // treatments operations

  async addTreatment(patientId: string, treatment: ITreatment) {
    const patient = await this.getOneById(patientId);
    patient.treatments.push(treatment);

    this.updateLastTreatment(patient);
    return patient.save();
  }

  async getTreatmentById(treatmentId: string) {
    return Patient.findOne({ 'treatments._id': treatmentId }, { 'treatments.$': 1 });
  }

  async updateTreatment(treatmentId: string, treatment: Partial<ITreatment>) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    const oldTreatment = patient.treatments.id(treatmentId);
    oldTreatment.set({ ...oldTreatment.toObject(), ...treatment });
    this.updateLastTreatment(patient);

    return patient.save();
  }

  async deleteTreatment(treatmentId: string) {
    const patient = await Patient.findOne({ 'treatments._id': treatmentId });
    patient.treatments.id(treatmentId).remove();
    return patient.save();
  }

  private updateLastTreatment(patient: IPatientDocument) {
    if (!patient.lastTreatment) patient.lastTreatment = patient.treatments[0].treatmentDate;
    else
      patient.lastTreatment = new Date(
        Math.max.apply(
          null,
          patient.treatments.map(treatment => new Date(treatment.treatmentDate))
        )
      );
  }
}

export default PatientRepository;
