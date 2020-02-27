import express from 'express';
import { IPatient } from '../../models/patientModel';
import { patientManager } from '../../managers';
import auth from '../middlewares/authMiddleware';
import { Errors } from '../../utils/errors';
import hasFields from '../middlewares/hasFieldMiddleware';
import hasBody from '../middlewares/hasBodyMiddleware';

const router = express.Router();

/**
 * Get /api/patient
 * Public
 * get all patients
 */
router.get<never, IPatient[], IPatient>('/', async function(req, res) {
  const patients = await patientManager.getPatients(req.user._id);
  res.status(200).json(patients);
});

/**
 * Get /api/patient/:id
 * Public
 * get patient by id
 */
router.get<IdParam, IPatient | ResErr, IPatient>('/:id', async function(req, res) {
  const patient = await patientManager.getPatientById(req.params.id);

  if (!patient) return res.status(400).json({ msg: Errors.PatientNotExist });

  res.status(200).json(patient);
});

/**
 * POST /api/patient/
 * Private
 * Add patient
 */
router.post<never, IPatient, IPatient>(
  '/',
  auth,
  hasFields<IPatient>(['firstName', 'lastName']),
  async (req, res) => {
    const patient = await patientManager.createPatient({ ...req.body, createdBy: req.user._id });
    res.status(201).json(patient);
  }
);

/**
 * PATCH /api/patient/:id
 * Private
 * Edit patient
 */
router.patch<IdParam, IPatient, IPatient>('/:id', auth, hasBody, async function(req, res) {
  const patient = await patientManager.updatePatient(req.params.id, req.body);
  res.status(200).json(patient);
});

/**
 * DELETE /api/patient/:id
 * Private
 * Delete patient
 */
router.delete<IdParam, IPatient | ResErr, IPatient>('/:id', auth, async function(req, res) {
  const patient = await patientManager.deletePatient(req.params.id);

  if (!patient) return res.status(400).json({ msg: Errors.PatientNotExist });

  res.status(200).json(patient);
});

export default router;
