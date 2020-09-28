import express from 'express';

import { reminderManager } from '../../managers';
import { UpdateReminder } from '../../managers/reminderManager';

const router = express.Router();

/**
 * Get /api/reminder?isNewReminders=true
 * Private
 * get all reminders / new and uncompleted reminders
 */
router.get<never, any[], never, { isNewReminders: boolean }>('/', async function (req, res) {
  const reminders = await reminderManager.getAllReminders(req.user._id, req.query.isNewReminders);
  res.status(200).json(reminders);
});

/**
 * Patch /api/:treatmentId
 * Private
 * edit reminder
 */
router.patch<never, any, string[]>('/multiple', async function (req, res) {
  await reminderManager.markRemindersAsComplete(req.body);
  res.status(204).end();
});

/**
 * Patch /api/:treatmentId
 * Private
 * edit reminder
 */
router.patch<{ treatmentId: string }, any, UpdateReminder>('/:treatmentId', async function (req, res) {
  await reminderManager.markReminderAsComplete(req.params.treatmentId, req.body);
  res.status(204).end();
});

export default router;
