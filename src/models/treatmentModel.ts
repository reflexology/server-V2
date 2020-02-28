import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';
import IncomeAndExpenditure from './incomeAndExpenditureModel';
import logger from '../utils/logger';

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
  patientId?: string;
  createdBy?: string;
}

export interface ITreatmentDocument extends Document, ITreatment {}

export const treatmentSchema = new Schema({
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
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: Consts.db.patientTableName, index: true, required: true }, // TODO add error message
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: Consts.db.userTableName, required: true }, // TODO add error message
  diagnosis: [String]
});

treatmentSchema.post<ITreatmentDocument>('save', async function() {
  const income = new IncomeAndExpenditure({
    isFromTreatment: true,
    treatmentId: this._id,
    createdBy: this.createdBy,
    amount: this.paidPrice,
    description: 'treatment' // TODO
  });

  income
    .save()
    .catch(() =>
      logger.error('failed to save income after saving treatment, treatment {1}'.format(income.treatmentId))
    );
});

const Treatment = model<ITreatmentDocument>(
  Consts.db.TreatmentTableName,
  treatmentSchema,
  Consts.db.TreatmentTableName
);

export default Treatment;
