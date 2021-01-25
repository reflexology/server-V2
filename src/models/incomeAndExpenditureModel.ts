import mongoose, { Document, model, Schema } from 'mongoose';

import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface Report {
  income: number;
  expenditure: number;
  netAmount: number;
}

export interface IIncomeAndExpenditure {
  description: string;
  note?: string;
  amount: number;
  createdAt?: Date;
  createdBy: string;
  isFromTreatment?: boolean;
  treatmentId?: string;
  isDeleted?: boolean;
}

export interface IIncomeAndExpenditureDocument extends Document, IIncomeAndExpenditure {}

export const incomeAndExpenditureSchema = new Schema<IIncomeAndExpenditureDocument>({
  description: { type: String, trim: true, required: [true, Errors.IncomeOrExpenseDescriptionRequired] },
  note: { type: String, trim: true },
  amount: { type: Number, required: true },
  isFromTreatment: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Consts.db.userTableName,
    required: [true, Errors.CreatedByRequired]
  },
  treatmentId: {
    type: mongoose.Schema.Types.ObjectId // TODO
  },
  isDeleted: { type: Boolean }
});

const IncomeAndExpenditure = model<IIncomeAndExpenditureDocument>(
  Consts.db.IncomeAndExpenditureTableName,
  incomeAndExpenditureSchema,
  Consts.db.IncomeAndExpenditureTableName
);

export default IncomeAndExpenditure;
