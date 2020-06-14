import { patientRepository } from '../repositories';

export function getAllReminders(userId: string, newTreatment: boolean) {
  return patientRepository.getAllReminders(userId, newTreatment);
}
