import { patientRepository } from '../repositories';
import { IPatient } from '../models/patientModel';

export function getPatients() {
  return patientRepository.getPatients();
}

export function getPatientById(id: string) {
  return patientRepository.getPatientById(id);
}

export function createPatient(patient: IPatient) {
  return patientRepository.createPatient(patient);
}

export function updatePatient(id: string, patient: IPatient) {
  return patientRepository.updatePatient(id, patient);
}

export function deletePatient(id: string) {
  return patientRepository.deletePatient(id);
}
