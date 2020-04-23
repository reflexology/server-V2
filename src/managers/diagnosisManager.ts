import { IDiagnosis } from '../models/diagnosisModel';
import { diagnosisRepository } from '../repositories';

export function getDiagnoses(userId: string) {
  return diagnosisRepository.getAllByUserId(userId);
}

export function getDiagnosisById(id: string) {
  return diagnosisRepository.getOneById(id);
}

export function createDiagnoses(userId: string, diagnoses: IDiagnosis[]) {
  return diagnosisRepository.createMulti(diagnoses.map(diagnosis => ({ ...diagnosis, createdBy: userId })));
}

export function createDiagnosis(userId: string, diagnosis: IDiagnosis) {
  return diagnosisRepository.create({ ...diagnosis, createdBy: userId });
}

export function updateDiagnosis(id: string, diagnosis: IDiagnosis) {
  return diagnosisRepository.update(id, diagnosis);
}

export function deleteDiagnosis(id: string) {
  return diagnosisRepository.delete(id);
}
