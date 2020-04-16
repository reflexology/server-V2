import express from 'express';
import { IIncomeAndExpenditure } from '../../models/incomeAndExpenditureModel';
import { incomeAndExpenditureManager } from '../../managers';
import { Errors } from '../../utils/errors';
import hasFields from '../middlewares/hasFieldMiddleware';
import hasBody from '../middlewares/hasBodyMiddleware';

const router = express.Router();

/**
 * Get /api/incomeAndExpenditure
 * Private
 * get all incomesAndExpenditures
 */
router.get<never, IIncomeAndExpenditure[], IIncomeAndExpenditure>('/', async function (req, res) {
  const incomesAndExpenditures = await incomeAndExpenditureManager.getIncomesAndExpenditures();
  res.status(200).json(incomesAndExpenditures);
});

/**
 * Get /api/incomeAndExpenditure/income?startDate=2010-03-02T19:00:00.000Z&endDate=2020-03-02T19:00:00.000Z
 * Private
 * get income by id
 */
router.get<IdParam, { amount: number }, IIncomeAndExpenditure>('/report', async function (req, res) {
  const data = await incomeAndExpenditureManager.getReport(req.query.startDate, req.query.endDate);

  res.status(200).json(data);
});

/**
 * Get /api/incomeAndExpenditure/:id
 * Private
 * get incomeAndExpenditure by id
 */
router.get<IdParam, IIncomeAndExpenditure | ResErr, IIncomeAndExpenditure>('/:id', async function (req, res) {
  const incomeAndExpenditure = await incomeAndExpenditureManager.getIncomeAndExpenditureById(req.params.id);

  if (!incomeAndExpenditure) return res.status(400).json({ msg: Errors.IncomeAndExpenditureNotExist });

  res.status(200).json(incomeAndExpenditure);
});

/**
 * POST /api/incomeAndExpenditure
 * Private
 * Add incomeAndExpenditure
 */
router.post<never, IIncomeAndExpenditure, IIncomeAndExpenditure>(
  '/',
  hasFields<IIncomeAndExpenditure>(['amount', 'description']),
  async (req, res) => {
    const incomeAndExpenditure = await incomeAndExpenditureManager.createIncomeAndExpenditure({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(incomeAndExpenditure);
  }
);

/**
 * PATCH /api/incomeAndExpenditure/:id
 * Private
 * Edit incomeAndExpenditure
 */
router.patch<IdParam, IIncomeAndExpenditure, IIncomeAndExpenditure>('/:id', hasBody, async function (req, res) {
  const incomeAndExpenditure = await incomeAndExpenditureManager.updateIncomeAndExpenditure(req.params.id, req.body);
  res.status(200).json(incomeAndExpenditure);
});

/**
 * DELETE /api/incomeAndExpenditure/:id
 * Private
 * Delete incomeAndExpenditure
 */
router.delete<IdParam, IIncomeAndExpenditure | ResErr, IIncomeAndExpenditure>('/:id', async function (req, res) {
  const incomeAndExpenditure = await incomeAndExpenditureManager.deleteIncomeAndExpenditure(req.params.id);

  if (!incomeAndExpenditure) return res.status(400).json({ msg: Errors.IncomeAndExpenditureNotExist });

  res.status(200).json(incomeAndExpenditure);
});

export default router;
