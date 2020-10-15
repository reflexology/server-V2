import { ITreatment } from '../models/treatmentModel';
import { incomeAndExpenditureRepository, patientRepository } from '../repositories';

export function getTreatments(): any {
  return patientRepository.getAll();
}

export async function getTreatmentsByPatientId(patientId: string) {
  const patient = await patientRepository.getTreatmentsByPatientId(patientId);

  // sort desc by treatment date
  return patient.treatments.sort(
    (treatmentA, treatmentB) => treatmentB.treatmentDate.getTime() - treatmentA.treatmentDate.getTime()
  );
}

export async function getLastTreatmentAndBalance(patientId: string) {
  const treatments = await getTreatmentsByPatientId(patientId);
  const balance = treatments.reduce<number>((accumulator, currentValue) => {
    return accumulator + (currentValue.paidPrice || 0) - (currentValue.treatmentPrice || 0);
  }, 0);

  return { balance, lastTreatment: treatments[0] };
}

export async function getTreatmentById(id: string): Promise<ITreatment> {
  const result = await patientRepository.getTreatmentById(id);
  return result?.treatments?.[0];
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
