import PatientRepository from './patientRepository';
import TreatmentRepository from './treatmentRepository';
import UserRepository from './userRepository';
import DiagnosisRepository from './diagnosesRepository';
import IncomeAndExpenditureRepository from './IncomeAndExpenditureRepository';

const patientRepository = new PatientRepository();
const treatmentRepository = new TreatmentRepository();
const diagnosisRepository = new DiagnosisRepository();
const incomeAndExpenditureRepository = new IncomeAndExpenditureRepository();
const userRepository = new UserRepository();

export { userRepository, patientRepository, treatmentRepository, diagnosisRepository, incomeAndExpenditureRepository };
