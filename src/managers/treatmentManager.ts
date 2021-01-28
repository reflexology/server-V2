import { ITreatment } from '../models/treatmentModel';
import { incomeAndExpenditureRepository, patientRepository } from '../repositories';

export function getTreatments(): any {
  return patientRepository.getAll();
}

export async function getTreatmentsByPatientId(patientId: string) {
  const results = await patientRepository.getTreatmentsByPatientId(patientId);

  return results?.[0]?.treatments || [];
}

export async function getLastTreatment(patientId: string) {
  const treatments = await getTreatmentsByPatientId(patientId);

  return treatments?.[0];
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

export async function updateTreatment(treatmentId: string, treatment: ITreatment) {
  const patient = await patientRepository.updateTreatment(treatmentId, treatment);
  const updatedTreatment = patient.treatments[patient.treatments.length - 1];
  if (treatment.paidPrice) {
    const oldIncome = await incomeAndExpenditureRepository.updateIncomeFromTreatment(
      updatedTreatment._id,
      updatedTreatment.paidPrice
    );
    if (!oldIncome) incomeAndExpenditureRepository.createIncomeFromTreatment(patient, updatedTreatment);
  }

  return updatedTreatment;
}

export async function deleteTreatment(treatmentId: string) {
  const treatment = await patientRepository.deleteTreatment(treatmentId);

  if (treatment.paidPrice) await incomeAndExpenditureRepository.deleteByTreatmentId(treatmentId);

  return treatment;
}
