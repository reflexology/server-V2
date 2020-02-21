import IncomeAndExpenditure, {
  IIncomeAndExpenditureDocument,
  IIncomeAndExpenditure
} from '../models/incomeAndExpenditureModel';
import BaseRepository from './baseRepository';

class IncomeAndExpenditureRepository extends BaseRepository<IIncomeAndExpenditureDocument, IIncomeAndExpenditure> {
  constructor() {
    super(IncomeAndExpenditure);
  }
}

export default IncomeAndExpenditureRepository;
