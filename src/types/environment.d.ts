// When you add some a new key to .env file,
// you also need to update this file to get better intellisense.

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    ACCESS_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_USER: string;
    MONGO_DB_NAME: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_S3_BUCKET_NAME: string;
  }
}
