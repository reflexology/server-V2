import { patientRepository } from '../repositories';
import { IPatient } from '../models/patientModel';
import moment from 'moment';

export function getPatients(userId: string, inDebt: boolean, inCredit: boolean) {
  return patientRepository.getAllByUser(userId, inDebt, inCredit);
}

export function getPatientById(id: string) {
  return patientRepository.getOneById(id);
}

export function createPatient(patient: IPatient) {
  if (patient.birthday) patient.birthday = moment.utc(patient.birthday, 'DD/MM/YYYY') as any; // TODO: validate date

  return patientRepository.create(patient);
}

export function updatePatient(id: string, patient: IPatient) {
  return patientRepository.update(id, patient);
}

export function deletePatient(id: string) {
  return patientRepository.delete(id);
}
