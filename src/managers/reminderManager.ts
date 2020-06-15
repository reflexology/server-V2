import { patientRepository } from '../repositories';

export interface Reminder {
  firstName: string;
  lastName: string;
  treatmentId: string;
  isReminderCompleted: boolean;
  reminderDate: Date;
  reminder: string;
}

export async function getAllReminders(userId: string, newTreatment: boolean): Promise<Reminder[]> {
  const reminders = await patientRepository.getAllReminders(userId, newTreatment);
  return reminders.map(reminder => ({
    firstName: reminder.firstName,
    lastName: reminder.lastName,
    isReminderCompleted: reminder.treatments.isReminderCompleted,
    reminderDate: reminder.treatments.reminderDate,
    treatmentId: reminder.treatments._id,
    reminder: reminder.treatments.reminder
  }));
}
