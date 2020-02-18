import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IPatient {
  title: string;
}

export interface IPatientDocument extends Document, IPatient {}

export const patientSchema = new Schema({
  firstName: { type: String, trim: true, required: [true, Errors.FirstNameRequired] },
  lastName: { type: String, trim: true, required: [true, Errors.LastNameRequired] },
  momName: { type: String, trim: true },
  birthday: { type: Date },
  age: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: [true, Errors.CreatedByRequired] },
  lastTreatment: { type: Date }
});

const Patient = model<IPatientDocument>(Consts.db.patientsTableName, patientSchema, Consts.db.patientsTableName);

export default Patient;
