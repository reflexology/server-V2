import { patientRepository } from '../repositories';
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

export function createTreatment(patientId: string, treatment: ITreatment) {
  return patientRepository.addTreatment(patientId, treatment);
}

export function updateTreatment(id: string, treatment: ITreatment): any {
  return patientRepository.updateTreatment(id, treatment);
}

export function deleteTreatment(id: string): any {
  return patientRepository.deleteTreatment(id);
}
