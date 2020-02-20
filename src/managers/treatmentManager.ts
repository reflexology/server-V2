import { treatmentRepository } from '../repositories';
import { ITreatment } from '../models/TreatmentModel';

export function getTreatments() {
  return treatmentRepository.getAll();
}

export function getTreatmentById(id: string) {
  return treatmentRepository.getOneById(id);
}

export function createTreatment(treatment: ITreatment) {
  return treatmentRepository.create(treatment);
}

export function updateTreatment(id: string, treatment: ITreatment) {
  return treatmentRepository.update(id, treatment);
}

export function deleteTreatment(id: string) {
  return treatmentRepository.delete(id);
}
