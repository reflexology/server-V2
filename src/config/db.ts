import mongoose, { ConnectionOptions } from 'mongoose';

import logger from '../utils/logger';

if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@reflexology-system-cluster-smsmf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const mongooseOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

const connectToDb = () =>
  mongoose
    .connect(connectionString, mongooseOptions)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error('MongoDB connection failed', err));

export default connectToDb;
