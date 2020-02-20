import Treatment, { ITreatment, ITreatmentDocument } from '../models/treatmentModel';
import BaseRepository from './baseRepository';

class TreatmentRepository extends BaseRepository<ITreatmentDocument, ITreatment> {
  constructor() {
    super(Treatment);
  }
}

export default TreatmentRepository;
