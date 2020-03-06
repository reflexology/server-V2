import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';
import { convertDateToAge } from '../utils/common';

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
  childrenCount: number;
  gender: 'Male' | 'Female';
  maritalStatus: 'Married' | 'Single' | 'Divorced' | 'Widowed';
  calculatedAge?: Readonly<string>;
}

export interface IPatientDocument extends Document, IPatient {}

export const patientSchema = new Schema<IPatientDocument>(
  {
    firstName: { type: String, trim: true, required: [true, Errors.FirstNameRequired], index: true },
    lastName: { type: String, trim: true, required: [true, Errors.LastNameRequired] },
    momName: { type: String, trim: true },
    birthday: { type: Date },
    age: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Consts.db.userTableName,
      required: [true, Errors.CreatedByRequired]
    },
    lastTreatment: { type: Date },
    childrenCount: { type: Number },
    gender: { type: String, enum: ['Male', 'Female'] },
    maritalStatus: { type: String, enum: ['Married', 'Single', 'Divorced', 'Widowed'] }
  },
  { toJSON: { virtuals: true } }
);

patientSchema.virtual('calculatedAge').get(function() {
  return this.birthday ? convertDateToAge(this.birthday) : this.age;
});

const Patient = model<IPatientDocument>(Consts.db.patientTableName, patientSchema, Consts.db.patientTableName);

export default Patient;
