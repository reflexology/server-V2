import { patientRepository, incomeAndExpenditureRepository } from '../repositories';
import { ITreatment } from '../models/treatmentModel';

export function getTreatments(): any {
  return patientRepository.getAll();
}

export async function getTreatmentsByPatientId(patientId: string) {
  const patient = await patientRepository.getOneById(patientId);
  return patient.treatments;
}

export async function getTreatmentById(id: string): Promise<ITreatment> {
  const result = await patientRepository.getTreatmentById(id);
  return result?.treatments?.[0];
}

export async function createTreatment(patientId: string, treatment: ITreatment) {
  const patient = await patientRepository.addTreatment(patientId, treatment);
  incomeAndExpenditureRepository.createIncomeFromTreatment(patient.treatments[patient.treatments.length - 1]); // todo check if last treatment in array is actually the new treatment
  return patient;
}

export function updateTreatment(id: string, treatment: ITreatment): any {
  // todo update income if paid price changed.
  return patientRepository.updateTreatment(id, treatment);
}

export function deleteTreatment(id: string): any {
  return patientRepository.deleteTreatment(id);
}
