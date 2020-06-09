import { Request } from 'express';
import aws from 'aws-sdk';
import path from 'path';
import logger from '../utils/logger';

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

export const makePublic = (key: string) =>
  new Promise<aws.AWSError | undefined>((resolve, reject) =>
    s3.putObjectAcl({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key, ACL: 'public' }, err => {
      if (err) {
        logger.error(err);
        reject(err);
      } else resolve();
    })
  );

export const makePrivate = (key: string) =>
  new Promise<aws.AWSError | undefined>((resolve, reject) =>
    s3.putObjectAcl({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key, ACL: 'private' }, err => {
      if (err) {
        logger.error(err);
        reject(err);
      } else resolve();
    })
  );

export const createFileMetadata = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: any, metadata?: any) => void
) => callback(null, { ext: path.extname(file.originalname), mimetype: file.mimetype });

export const createFileKey = (
  req: Request,
  file: Express.MulterS3.File,
  callback: (error: any, key?: string) => void
) => callback(null, Date.now().toString() + '-' + file.originalname);
