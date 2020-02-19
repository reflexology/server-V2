import { isObjectEmpty } from '../../utils/common';
import express from 'express';
import { IPatient } from '../../models/patient';
import { patientManager } from '../../managers';
import auth from '../middlewares/authMiddleware';
import { Errors } from '../../utils/errors';
import hasFields from '../middlewares/hasFieldMiddleware';

const router = express.Router();

/**
 * Get /api/patient
 * Public
 * get all patients
 */
router.get('/', async function(req, res) {
  const patients = await patientManager.getPatients();
  res.status(200).json(patients);
});

/**
 * Get /api/patient/:id
 * Public
 * get patient by id
 */
router.get('/:id', async function(req, res) {
  const patient = await patientManager.getPatientById(req.params.id);
  res.status(200).json(patient);
});

/**
 * POST /api/patient/
 * Private
 * Add patient
 */
router.post(
  '/',
  auth,
  hasFields<IPatient>(['firstName', 'lastName', 'createdBy']),
  async (req, res) => {
    const patient = await patientManager.createPatient(req.body);
    res.status(201).json(patient);
  }
);

/**
 * PATCH /api/patient/:id
 * Private
 * Edit patient
 */
router.patch('/:id', auth, async function(req, res) {
  // Simple validations
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: Errors.MissingFields });

  const patient = await patientManager.updatePatient(req.params.id, req.body);
  res.status(200).json(patient);
});

/**
 * DELETE /api/patient/:id
 * Private
 * Delete patient
 */
router.delete('/:id', auth, async function(req, res) {
  const patient = await patientManager.deletePatient(req.params.id);
  res.status(200).json(patient);
});

export default router;
