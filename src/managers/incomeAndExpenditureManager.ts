import { IIncomeAndExpenditure } from '../models/incomeAndExpenditureModel';
import { incomeAndExpenditureRepository } from '../repositories';

export function getIncomesAndExpenditures() {
  return incomeAndExpenditureRepository.getAll();
}

export function getIncomeAndExpenditureById(id: string) {
  return incomeAndExpenditureRepository.getOneById(id);
}

export function createIncomeAndExpenditure(incomeAndExpenditure: IIncomeAndExpenditure) {
  return incomeAndExpenditureRepository.create(incomeAndExpenditure);
}

export function updateIncomeAndExpenditure(id: string, incomeAndExpenditure: IIncomeAndExpenditure) {
  return incomeAndExpenditureRepository.update(id, incomeAndExpenditure);
}

export function deleteIncomeAndExpenditure(id: string) {
  return incomeAndExpenditureRepository.delete(id);
}
