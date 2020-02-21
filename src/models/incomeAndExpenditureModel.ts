import mongoose, { Document, model, Schema } from 'mongoose';
import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IIncomeAndExpenditure {
  expenditure?: string;
  income?: string;
  price: number;
  createdAt?: Date;
  createdBy: string;
}

export interface IIncomeAndExpenditureDocument extends Document, IIncomeAndExpenditure {}

export const incomeAndExpenditureSchema = new Schema<IIncomeAndExpenditure>({
  expenditure: { type: String, trim: true },
  income: { type: String, trim: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: [true, Errors.CreatedByRequired] }
});

const IncomeAndExpenditure = model<IIncomeAndExpenditureDocument>(
  Consts.db.IncomeAndExpenditureTableName,
  incomeAndExpenditureSchema,
  Consts.db.IncomeAndExpenditureTableName
);

export default IncomeAndExpenditure;
