import Diagnosis, { IDiagnosis, IDiagnosisDocument } from '../models/diagnosisModel';
import BaseRepository from './baseRepository';

class DiagnosisRepository extends BaseRepository<IDiagnosisDocument, IDiagnosis> {
  constructor() {
    super(Diagnosis);
  }

  getAllByUserId(userId: string) {
    return this.model.find({ createdBy: userId });
  }

  createMulti(diagnoses: IDiagnosis[]) {
    return this.model.create(...diagnoses);
  }
}

export default DiagnosisRepository;
