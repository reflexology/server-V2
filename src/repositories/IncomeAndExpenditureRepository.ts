import IncomeAndExpenditure, {
  IIncomeAndExpenditure,
  IIncomeAndExpenditureDocument,
  Report
} from '../models/incomeAndExpenditureModel';
import { ITreatmentSubDocument } from '../models/treatmentModel';
import logger from '../utils/logger';
import BaseRepository from './baseRepository';

class IncomeAndExpenditureRepository extends BaseRepository<IIncomeAndExpenditureDocument, IIncomeAndExpenditure> {
  constructor() {
    super(IncomeAndExpenditure);
  }

  getReport(startDate?: Date, endDate?: Date) {
    const aggregations = [];

    if (startDate || endDate) {
      let createdAt = {};
      createdAt = startDate ? { $gte: new Date(startDate.toISOString()) } : {};
      createdAt = endDate ? { ...createdAt, $lt: new Date(endDate.toISOString()) } : createdAt;
      aggregations.push({ $match: { createdAt: createdAt } });
    }
    aggregations.push(
      {
        $project: {
          income: { $cond: [{ $gt: ['$amount', 0] }, '$amount', 0] },
          expenditure: { $cond: [{ $lt: ['$amount', 0] }, '$amount', 0] },
          amount: 1
        }
      },
      {
        $group: {
          _id: 0,
          income: { $sum: '$income' },
          expenditure: { $sum: '$expenditure' },
          netAmount: { $sum: '$amount' }
        }
      },
      {
        $project: { _id: 0 }
      }
    );

    return IncomeAndExpenditure.aggregate<Report>(aggregations);
  }

  createIncomeFromTreatment(treatment: ITreatmentSubDocument) {
    logger.info('creating income from treatment, treatment id: {1}'.format(treatment._id));
    const income = new IncomeAndExpenditure({
      isFromTreatment: true,
      treatmentId: treatment._id,
      createdBy: treatment.createdBy,
      amount: treatment.paidPrice,
      description: 'treatment' // TODO
    });

    income
      .save()
      .catch(err =>
        logger.error('failed to save income after saving treatment, treatment id: {1}'.format(income.treatmentId), err)
      );
  }
}

export default IncomeAndExpenditureRepository;
