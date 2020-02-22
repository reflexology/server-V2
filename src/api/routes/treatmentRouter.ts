import { ITreatment } from './../../models/treatmentModel';
import express from 'express';
import { treatmentManager } from '../../managers';
import auth from '../middlewares/authMiddleware';
import { Errors } from '../../utils/errors';
import hasFields from '../middlewares/hasFieldMiddleware';
import hasBody from '../middlewares/hasBodyMiddleware';

const router = express.Router();

/**
 * Get /api/treatment
 * Public
 * get all treatments
 */
router.get<never, ITreatment[], ITreatment>('/', async function(req, res) {
  const treatments = await treatmentManager.getTreatments();
  res.status(200).json(treatments);
});

/**
 * Get /api/treatment/:id
 * Public
 * get treatment by id
 */
router.get<IdParam, ITreatment | ResErr, ITreatment>('/:id', async function(req, res) {
  const treatment = await treatmentManager.getTreatmentById(req.params.id);

  if (!treatment) return res.status(400).json({ msg: Errors.TreatmentNotExist });

  res.status(200).json(treatment);
});

/**
 * POST /api/treatment/
 * Private
 * Add treatment
 */
router.post<never, ITreatment, ITreatment>(
  '/',
  auth,
  hasFields<ITreatment>(['treatmentNumber']),
  async (req, res) => {
    const treatment = await treatmentManager.createTreatment({ ...req.body, createdBy: req.user._id });
    res.status(201).json(treatment);
  }
);

/**
 * PATCH /api/treatment/:id
 * Private
 * Edit treatment
 */
router.patch<IdParam, ITreatment, ITreatment>('/:id', auth, hasBody, async function(req, res) {
  const treatment = await treatmentManager.updateTreatment(req.params.id, req.body);
  res.status(200).json(treatment);
});

/**
 * DELETE /api/treatment/:id
 * Private
 * Delete treatment
 */
router.delete<IdParam, ITreatment | ResErr, ITreatment>('/:id', auth, async function(req, res) {
  const treatment = await treatmentManager.deleteTreatment(req.params.id);

  if (!treatment) return res.status(400).json({ msg: Errors.TreatmentNotExist });

  res.status(200).json(treatment);
});

export default router;
