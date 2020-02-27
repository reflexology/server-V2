import { patientRepository } from '../repositories';
import { IPatient } from '../models/patientModel';

export function getPatients(userId: string) {
  return patientRepository.getAllByUser(userId);
}

export function getPatientById(id: string) {
  return patientRepository.getOneById(id);
}

export function createPatient(patient: IPatient) {
  return patientRepository.create(patient);
}

export function updatePatient(id: string, patient: IPatient) {
  return patientRepository.update(id, patient);
}

export function deletePatient(id: string) {
  return patientRepository.delete(id);
}
