import { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';

export interface IDiagnosis {
  name: string;
}

export interface IDiagnosisDocument extends Document, IDiagnosis {}

export const diagnosisSchema = new Schema({
  name: { type: String, trim: true }
});

const Diagnosis = model<IDiagnosisDocument>(
  Consts.db.DiagnosisTableName,
  diagnosisSchema,
  Consts.db.DiagnosisTableName
);

export default Diagnosis;
