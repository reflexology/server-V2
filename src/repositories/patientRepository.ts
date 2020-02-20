import Patient, { IPatient } from '../models/patient';

export function getPatients() {
  return Patient.find().sort({ lastTreatment: -1 });
}

export function getPatientById(id: string) {
  return Patient.findById(id);
}

export function createPatient(patient: IPatient) {
  return Patient.create(patient);
}

export function updatePatient(id: string, patient: IPatient) {
  return Patient.findByIdAndUpdate(id, patient, { new: true, runValidators: true });
}

export function deletePatient(id: string) {
  return Patient.findByIdAndDelete(id);
}
