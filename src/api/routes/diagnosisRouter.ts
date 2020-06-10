import express from 'express';

import { diagnosisManager } from '../../managers';
import { IDiagnosis } from '../../models/diagnosisModel';
import { Errors } from '../../utils/errors';
import hasBody from '../middlewares/hasBodyMiddleware';
import hasFields from '../middlewares/hasFieldMiddleware';

const router = express.Router();

/**
 * Get /api/diagnosis
 * Private
 * get all diagnoses
 */
router.get<never, IDiagnosis[], IDiagnosis>('/', async function (req, res) {
  const diagnoses = await diagnosisManager.getDiagnoses(req.user._id);
  res.status(200).json(diagnoses);
});

/**
 * Get /api/diagnosis/:id
 * Private
 * get diagnosis by id
 */
router.get<IdParam, IDiagnosis | ResErr, IDiagnosis>('/:id', async function (req, res) {
  const diagnosis = await diagnosisManager.getDiagnosisById(req.params.id);

  if (!diagnosis) return res.status(400).json({ msg: Errors.DiagnosisNotExist });

  res.status(200).json(diagnosis);
});

/**
 * POST /api/diagnosis/
 * Private
 * Add diagnosis
 */
router.post<never, IDiagnosis, IDiagnosis>(
  '/',
  hasFields<IDiagnosis>(['name']),
  async (req, res) => {
    const diagnosis = await diagnosisManager.createDiagnosis(req.user._id, req.body);
    res.status(201).json(diagnosis);
  }
);

/**
 * POST /api/diagnosis/
 * Private
 * Add diagnosis
 */
router.post<never, IDiagnosis[], IDiagnosis[]>(
  '/multiple',
  hasFields<IDiagnosis>(['name']),
  async (req, res) => {
    const diagnoses = await diagnosisManager.createDiagnoses(req.user._id, req.body);
    res.status(201).json(diagnoses);
  }
);

/**
 * PATCH /api/diagnosis/:id
 * Private
 * Edit diagnosis
 */
router.patch<IdParam, IDiagnosis, IDiagnosis>('/:id', hasBody, async function (req, res) {
  const diagnosis = await diagnosisManager.updateDiagnosis(req.params.id, req.body);
  res.status(200).json(diagnosis);
});

/**
 * DELETE /api/diagnosis/:id
 * Private
 * Delete diagnosis
 */
router.delete<IdParam, IDiagnosis | ResErr, IDiagnosis>('/:id', async function (req, res) {
  const diagnosis = await diagnosisManager.deleteDiagnosis(req.params.id);

  if (!diagnosis) return res.status(400).json({ msg: Errors.DiagnosisNotExist });

  res.status(200).json(diagnosis);
});

export default router;
