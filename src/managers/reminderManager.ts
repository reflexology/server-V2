import { ITreatment } from '../models/treatmentModel';
import { patientRepository } from '../repositories';

export interface Reminder {
  firstName: string;
  lastName: string;
  treatmentId: string;
  isReminderCompleted: boolean;
  reminderDate: Date;
  reminders: string;
}
export type UpdateReminder = Pick<ITreatment, 'isReminderCompleted' | 'reminders' | 'reminderDate'>;

export async function getAllReminders(userId: string, newTreatment: boolean): Promise<Reminder[]> {
  const reminders = await patientRepository.getAllReminders(userId, newTreatment);

  return reminders.map(reminder => ({
    firstName: reminder.firstName,
    lastName: reminder.lastName,
    isReminderCompleted: reminder.treatments.isReminderCompleted,
    reminderDate: reminder.treatments.reminderDate,
    treatmentId: reminder.treatments._id,
    reminders: reminder.treatments.reminders
  }));
}

export function markReminderAsComplete(treatmentId: string, reminder: UpdateReminder) {
  return patientRepository.updateTreatment(treatmentId, reminder);
}

export function markRemindersAsComplete(treatmentIds: string[]) {
  return patientRepository.markRemindersAsCompleted(treatmentIds);
}
