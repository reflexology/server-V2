import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envPath = process.env.NODE_ENV === 'test' ? '../../.env.' + process.env.NODE_ENV : '../../.env';

const envFound = dotenv.config({ path: __dirname + '/' + envPath });

if (envFound.error && process.env.NODE_ENV !== 'production') {
  console.warn(`⚠️  Couldn't find .env file  ⚠️`);
}
