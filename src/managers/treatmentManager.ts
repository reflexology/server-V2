import { ITreatment } from '../models/treatmentModel';
import { incomeAndExpenditureRepository, patientRepository } from '../repositories';

export function getTreatments(): any {
  return patientRepository.getAll();
}

export async function getTreatmentsByPatientId(patientId: string) {
  const patient = await patientRepository.getTreatmentsByPatientId(patientId);

  return patient.treatments
    .filter(treatment => !treatment.isDeleted)
    .sort((treatmentA, treatmentB) => treatmentB.treatmentDate.getTime() - treatmentA.treatmentDate.getTime());
}

export async function getLastTreatment(patientId: string) {
  const treatments = await getTreatmentsByPatientId(patientId);

  return treatments[0];
}

export async function getTreatmentById(treatmentId: string): Promise<ITreatment> {
  const patient = await patientRepository.getTreatmentById(treatmentId);
  return patient?.treatments?.[0];
}

export async function createTreatment(patientId: string, treatment: ITreatment) {
  const patient = await patientRepository.addTreatment(patientId, treatment);

  const newTreatment = patient.treatments[patient.treatments.length - 1];
  // todo check if last treatment in array is actually the new treatment

  if (treatment.paidPrice) incomeAndExpenditureRepository.createIncomeFromTreatment(patient, newTreatment);
  return newTreatment;
}

export async function updateTreatment(id: string, treatment: ITreatment) {
  // todo update income if paid price changed.
  const patient = await patientRepository.updateTreatment(id, treatment);
  return patient.treatments[patient.treatments.length - 1];
}

export function deleteTreatment(id: string): any {
  return patientRepository.deleteTreatment(id);
}
