import { IIncomeAndExpenditure } from '../models/incomeAndExpenditureModel';
import { incomeAndExpenditureRepository } from '../repositories';

export function getIncomesAndExpenditures() {
  return incomeAndExpenditureRepository.getAll();
}

export async function getIncome(startDate?: string, endDate?: string) {
  const result = await incomeAndExpenditureRepository.getIncome(
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null
  );

  return result.length > 0 ? result[0].amount : 0;
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
