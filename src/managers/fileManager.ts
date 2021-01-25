import aws from 'aws-sdk';
import { Request } from 'express';
import path from 'path';

import logger from '../utils/logger';

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

export const getObject = (key: string) => {
  return new Promise<aws.AWSError | aws.S3.GetObjectOutput>((resolve, reject) => {
    const params = { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key };
    return s3.getObject(params, (err, data) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else resolve(data);
    });
  });
};

export const deleteObject = (key: string) => {
  return new Promise<aws.AWSError | aws.S3.GetObjectOutput>((resolve, reject) => {
    const params = { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key };
    return s3.deleteObject(params, (err, data) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else resolve(data);
    });
  });
};

export const makePublic = (key: string) =>
  new Promise<aws.AWSError | void>((resolve, reject) =>
    s3.putObjectAcl({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key, ACL: 'public' }, err => {
      if (err) {
        logger.error(err);
        reject(err);
      } else resolve();
    })
  );

export const makePrivate = (key: string) =>
  new Promise<aws.AWSError | void>((resolve, reject) =>
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
