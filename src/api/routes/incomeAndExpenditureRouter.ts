import express from 'express';
import { IIncomeAndExpenditure } from '../../models/incomeAndExpenditureModel';
import { incomeAndExpenditureManager } from '../../managers';
import auth from '../middlewares/authMiddleware';
import { Errors } from '../../utils/errors';
import hasFields from '../middlewares/hasFieldMiddleware';
import hasBody from '../middlewares/hasBodyMiddleware';

const router = express.Router();

/**
 * Get /api/incomeAndExpenditure
 * Public
 * get all incomesAndExpenditures
 */
router.get<never, IIncomeAndExpenditure[], IIncomeAndExpenditure>('/', async function(req, res) {
  const incomesAndExpenditures = await incomeAndExpenditureManager.getIncomesAndExpenditures();
  res.status(200).json(incomesAndExpenditures);
});

/**
 * Get /api/incomeAndExpenditure/:id
 * Public
 * get incomeAndExpenditure by id
 */
router.get<IdParam, IIncomeAndExpenditure | ResErr, IIncomeAndExpenditure>('/:id', async function(req, res) {
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
  auth,
  hasFields<IIncomeAndExpenditure>(['price']),
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
router.patch<IdParam, IIncomeAndExpenditure, IIncomeAndExpenditure>('/:id', auth, hasBody, async function(req, res) {
  const incomeAndExpenditure = await incomeAndExpenditureManager.updateIncomeAndExpenditure(req.params.id, req.body);
  res.status(200).json(incomeAndExpenditure);
});

/**
 * DELETE /api/incomeAndExpenditure/:id
 * Private
 * Delete incomeAndExpenditure
 */
router.delete<IdParam, IIncomeAndExpenditure | ResErr, IIncomeAndExpenditure>('/:id', auth, async function(req, res) {
  const incomeAndExpenditure = await incomeAndExpenditureManager.deleteIncomeAndExpenditure(req.params.id);

  if (!incomeAndExpenditure) return res.status(400).json({ msg: Errors.IncomeAndExpenditureNotExist });

  res.status(200).json(incomeAndExpenditure);
});

export default router;
