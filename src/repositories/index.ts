import DiagnosisRepository from './diagnosesRepository';
import IncomeAndExpenditureRepository from './IncomeAndExpenditureRepository';
import PatientRepository from './patientRepository';
import UserRepository from './userRepository';

const patientRepository = new PatientRepository();
const diagnosisRepository = new DiagnosisRepository();
const incomeAndExpenditureRepository = new IncomeAndExpenditureRepository();
const userRepository = new UserRepository();

export { diagnosisRepository, incomeAndExpenditureRepository, patientRepository, userRepository };
