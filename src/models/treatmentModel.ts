import mongoose, { Schema } from 'mongoose';

import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface ITreatment {
  treatmentDate?: Date;
  referredBy?: string;
  visitReason?: string;
  treatmentNumber: number;
  findings?: string;
  recommendations?: string;
  remarks?: string;
  treatmentPrice?: number;
  paidPrice?: number;
  reminders?: string;
  reminderDate?: Date;
  isReminderCompleted?: boolean;
  createdBy?: string;
  isDeleted?: boolean;
}

export interface ITreatmentSubDocument extends mongoose.Types.Subdocument, ITreatment {}

export const treatmentSchema = new Schema<ITreatmentSubDocument>(
  {
    treatmentDate: { type: Date, default: Date.now },
    referredBy: { type: String, trim: true },
    visitReason: { type: String, trim: true },
    treatmentNumber: { type: Number, required: [true, Errors.TreatmentNumberRequired] },
    findings: { type: String, trim: true },
    recommendations: { type: String, trim: true },
    remarks: { type: String, trim: true },
    treatmentPrice: { type: Number, trim: true },
    paidPrice: { type: Number, trim: true },
    reminders: { type: String, trim: true },
    reminderDate: { type: Date },
    isReminderCompleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Consts.db.userTableName,
      required: [true, Errors.CreatedByRequired]
    },
    diagnoses: [String],
    treatmentType: { type: String, enum: ['Reflexology', 'Diet'], required: [true, Errors.TreatmentTypeRequired] },
    isDeleted: { type: Boolean }
  },
  { strict: false }
);
