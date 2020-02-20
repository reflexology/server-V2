import PatientRepository from './patientRepository';
import TreatmentRepository from './treatmentRepository';
import UserRepository from './userRepository';

const patientRepository = new PatientRepository();
const treatmentRepository = new TreatmentRepository();
const userRepository = new UserRepository();

export { userRepository, patientRepository, treatmentRepository };
