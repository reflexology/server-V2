import { Document, Model } from 'mongoose';

abstract class BaseRepository<T extends Document, Data> {
  constructor(protected model: Model<T>) {}

  getAll() {
    return this.model.find();
  }

  getOneById(id: string, projection?: { [key: string]: any }) {
    return this.model.findById(id, projection);
  }

  create(data: Data) {
    return this.model.create<Data>(data as any);
  }

  update(id: string, data: Data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
