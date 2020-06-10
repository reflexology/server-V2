import { IPatient } from '../models/patientModel';
import { patientRepository } from '../repositories';
import { convertDateToAge } from '../utils/common';

export async function getPatients(userId: string, inDebt: boolean, inCredit: boolean) {
  const patients = await patientRepository.getAllByUser(userId, inDebt, inCredit);
  return patients.map(patient => ({ ...patient, calculateAge: calculateAge(patient) }));
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

export function calculateAge(patient: IPatient) {
  return patient.birthday ? convertDateToAge(patient.birthday) : patient.age;
}
