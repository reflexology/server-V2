import Diagnosis, { IDiagnosisDocument, IDiagnosis } from '../models/diagnosisModel';
import BaseRepository from './baseRepository';

class DiagnosisRepository extends BaseRepository<IDiagnosisDocument, IDiagnosis> {
  constructor() {
    super(Diagnosis);
  }

  getAllByUserId(userId: string) {
    return this.model.find({ createdBy: userId });
  }
}

export default DiagnosisRepository;
