import PatientRepository from './patientRepository';
import UserRepository from './userRepository';
import DiagnosisRepository from './diagnosesRepository';
import IncomeAndExpenditureRepository from './IncomeAndExpenditureRepository';

const patientRepository = new PatientRepository();
const diagnosisRepository = new DiagnosisRepository();
const incomeAndExpenditureRepository = new IncomeAndExpenditureRepository();
const userRepository = new UserRepository();

export { userRepository, patientRepository, diagnosisRepository, incomeAndExpenditureRepository };
