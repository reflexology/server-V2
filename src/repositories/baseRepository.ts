import { Model, Document } from 'mongoose';

abstract class BaseRepository<T extends Document, Data> {
  constructor(protected model: Model<T>) {}

  getAll() {
    return this.model.find();
  }

  getOneById(id: string) {
    return this.model.findById(id);
  }

  create(data: Data) {
    return this.model.create(data);
  }

  update(id: string, data: Data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
