import Patient, { IPatient, IPatientDocument } from '../models/patientModel';
import BaseRepository from './baseRepository';
import Consts from '../utils/consts';
import Treatment from '../models/treatmentModel';

class PatientRepository extends BaseRepository<IPatientDocument, IPatient> {
  constructor() {
    super(Patient);
  }

  getAllByUser(userId: string) {
    return Patient.find({ createdBy: userId }).populate(Consts.db.TreatmentTableName);
  }

  // TODO refactor
  async updateLastTreatment(patientId: string, date: Date) {
    const patient = await this.getOneById(patientId);

    if (!patient.lastTreatment) patient.lastTreatment = date;
    else {
      const lastTreatment = await Treatment.findOne({ patientId: patient._id }, 'treatmentDate', {
        sort: { date: -1 } //Sort by Date Added DESC
      });

      patient.lastTreatment = lastTreatment.treatmentDate;
    }
    return patient.save();
  }
}

export default PatientRepository;
