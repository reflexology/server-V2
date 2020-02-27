import Patient, { IPatient, IPatientDocument } from '../models/patientModel';
import BaseRepository from './baseRepository';

class PatientRepository extends BaseRepository<IPatientDocument, IPatient> {
  constructor() {
    super(Patient);
  }

  getAllByUser(userId: string) {
    return Patient.find({ createdBy: userId });
  }
}

export default PatientRepository;
