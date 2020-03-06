import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';
import IncomeAndExpenditure from './incomeAndExpenditureModel';
import logger from '../utils/logger';
import { patientRepository } from '../repositories';

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
  diagnoses: [String]
});

treatmentSchema.post<ITreatmentDocument>('save', function() {
  const income = new IncomeAndExpenditure({
    isFromTreatment: true,
    treatmentId: this._id,
    createdBy: this.createdBy,
    amount: this.paidPrice,
    description: 'treatment' // TODO
  });

  income
    .save()
    .catch(err =>
      logger.error('failed to save income after saving treatment, treatment id: {1}'.format(income.treatmentId), err)
    );
});

treatmentSchema.post<ITreatmentDocument>('save', function() {
  patientRepository
    .updateLastTreatment(this.patientId, this.treatmentDate)
    .catch(err =>
      logger.error('failed to save last treatment after saving treatment, treatment id: {1}'.format(this._id), err)
    );
});

treatmentSchema.post<ITreatmentDocument>('findOneAndUpdate', function(newTreatment: ITreatmentDocument) {
  patientRepository
    .updateLastTreatment(newTreatment.patientId, newTreatment.treatmentDate)
    .catch(err =>
      logger.error('failed to save last treatment after saving treatment, treatment id: {1}'.format(this._id), err)
    );
});

const Treatment = model<ITreatmentDocument>(
  Consts.db.TreatmentTableName,
  treatmentSchema,
  Consts.db.TreatmentTableName
);

export default Treatment;
