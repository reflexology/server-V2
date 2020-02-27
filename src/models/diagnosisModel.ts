import mongoose, { Document, model, Schema } from 'mongoose';
import { Errors } from './../utils/errors';
import Consts from '../utils/consts';

export interface IDiagnosis {
  name: string;
  createdBy: string;
}

export interface IDiagnosisDocument extends Document, IDiagnosis {}

export const diagnosisSchema = new Schema({
  name: { type: String, trim: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Consts.db.userTableName,
    required: [true, Errors.CreatedByRequired]
  }
});

const Diagnosis = model<IDiagnosisDocument>(
  Consts.db.DiagnosisTableName,
  diagnosisSchema,
  Consts.db.DiagnosisTableName
);

export default Diagnosis;
