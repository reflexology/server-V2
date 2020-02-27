import Treatment, { ITreatment, ITreatmentDocument } from '../models/treatmentModel';
import BaseRepository from './baseRepository';

class TreatmentRepository extends BaseRepository<ITreatmentDocument, ITreatment> {
  constructor() {
    super(Treatment);
  }

  getTreatmentsByPatientId(patientId: string) {
    return Treatment.find({ patientId });
  }
}

export default TreatmentRepository;
