import IncomeAndExpenditure, {
  IIncomeAndExpenditureDocument,
  IIncomeAndExpenditure
} from '../models/incomeAndExpenditureModel';
import BaseRepository from './baseRepository';

class IncomeAndExpenditureRepository extends BaseRepository<IIncomeAndExpenditureDocument, IIncomeAndExpenditure> {
  constructor() {
    super(IncomeAndExpenditure);
  }

  getIncome(startDate?: Date, endDate?: Date) {
    const aggregations = [];

    if (startDate || endDate) {
      let createdAt = {};
      createdAt = startDate ? { ...createdAt, $gte: new Date(startDate.toISOString()) } : createdAt;
      createdAt = endDate ? { ...createdAt, $gte: new Date(endDate.toISOString()) } : createdAt;
      aggregations.push({ $match: { createdAt: createdAt } });
    }

    aggregations.push({ $group: { _id: null, amount: { $sum: '$amount' } } }, { $project: { _id: 0, amount: 1 } });

    return IncomeAndExpenditure.aggregate<{ amount: number }>(aggregations);
  }
}

export default IncomeAndExpenditureRepository;
