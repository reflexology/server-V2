import express from 'express';

import { treatmentManager } from '../../managers';
import { Errors } from '../../utils/errors';
import hasBody from '../middlewares/hasBodyMiddleware';
import hasFields from '../middlewares/hasFieldMiddleware';
import { ITreatment } from './../../models/treatmentModel';

const router = express.Router();

/**
 * Get /api/treatment
 * Private
 * get all treatments
 */
router.get<never, ITreatment[], ITreatment>('/', async function (req, res) {
  const treatments = await treatmentManager.getTreatments();
  res.status(200).json(treatments);
});

/**
 * Get /api/treatment/byPatientId:patientId
 * Private
 * get all treatments by patient id
 */
router.get<{ patientId: string }, ITreatment, ITreatment>(
  '/lastTreatment/byPatientId/:patientId',
  async function (req, res) {
    const data = await treatmentManager.getLastTreatment(req.params.patientId);
    res.status(200).json(data);
  }
);

/**
 * Get /api/treatment/byPatientId:patientId
 * Private
 * get all treatments by patient id
 */
router.get<{ patientId: string }, ITreatment[], ITreatment>('/byPatientId/:patientId', async function (req, res) {
  const treatments = await treatmentManager.getTreatmentsByPatientId(req.params.patientId);
  res.status(200).json(treatments);
});

/**
 * Get /api/treatment/:id
 * Private
 * get treatment by id
 */
router.get<IdParam, ITreatment | ResErr, ITreatment>('/:id', async function (req, res) {
  const treatment = await treatmentManager.getTreatmentById(req.params.id);

  if (!treatment) return res.status(400).json({ msg: Errors.TreatmentNotExist });

  res.status(200).json(treatment);
});

/**
 * POST /api/treatment/
 * Private
 * Add treatment
 */
router.post<{ patientId: string }, ITreatment, ITreatment>(
  '/patient/:patientId',
  hasFields<ITreatment>(['treatmentNumber']),
  async (req, res) => {
    const treatment = await treatmentManager.createTreatment(req.params.patientId, {
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(treatment);
  }
);

/**
 * PATCH /api/treatment/:id
 * Private
 * Edit treatment
 */
router.patch<IdParam, ITreatment, ITreatment>('/:id', hasBody, async function (req, res) {
  const treatment = await treatmentManager.updateTreatment(req.params.id, req.body);

  res.status(200).json(treatment);
});

/**
 * DELETE /api/treatment/:id
 * Private
 * Delete treatment
 */
router.delete<IdParam, ITreatment | ResErr, ITreatment>('/:id', async function (req, res) {
  const treatment = await treatmentManager.deleteTreatment(req.params.id);

  if (!treatment) return res.status(400).json({ msg: Errors.TreatmentNotExist });

  res.status(200).json(treatment);
});

export default router;
