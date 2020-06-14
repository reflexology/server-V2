import express from 'express';

import { reminderManager } from '../../managers';

const router = express.Router();

/**
 * Get /api/reminder?isNewReminders=true
 * Private
 * get all reminders / new and uncompleted reminders
 */
router.get<never, any[], never>('/', async function (req, res) {
  const reminders = await reminderManager.getAllReminders(req.user._id, req.query.isNewReminders);
  res.status(200).json(reminders);
});

export default router;
