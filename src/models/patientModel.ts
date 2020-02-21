import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IPatient {
  firstName: string;
  lastName: string;
  momName?: string;
  birthday?: Date;
  age?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  createdBy: string;
  lastTreatment?: Date;
  maritalStatus: 'Married' | 'Single' | 'Divorced' | 'Widowed';
}

export interface IPatientDocument extends Document, IPatient {}

export const patientSchema = new Schema({
  firstName: { type: String, trim: true, required: [true, Errors.FirstNameRequired], index: true },
  lastName: { type: String, trim: true, required: [true, Errors.LastNameRequired] },
  momName: { type: String, trim: true },
  birthday: { type: Date },
  age: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: [true, Errors.CreatedByRequired] },
  lastTreatment: { type: Date },
  maritalStatus: { type: String, enum: ['Married', 'Single', 'Divorced', 'Widowed'] }
});

const Patient = model<IPatientDocument>(Consts.db.patientTableName, patientSchema, Consts.db.patientTableName);

export default Patient;
