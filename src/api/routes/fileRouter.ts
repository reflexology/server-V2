import express from 'express';
import multerS3 from 'multer-s3';
import multer from 'multer';
import { fileManager } from '../../managers';

const router = express.Router();

export const upload = multer({
  storage: multerS3({
    s3: fileManager.s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: fileManager.createFileMetadata,
    key: fileManager.createFileKey
  })
});

/**
 * POST /api/file/
 * Private
 * Add single file
 */
router.post<never, Express.Multer.File, never>('/', upload.single('file'), async (req, res) => {
  res.status(200).send(req.file);
});

/**
 * POST /api/file/multiple
 * Private
 * Add multiple files
 */
router.post<never, any, never>('/multiple', upload.any(), async (req, res) => {
  res.status(200).send(req.files);
});

/**
 * PUT /api/file/make-private/:key
 * Private
 * Make file private
 * CURRENTLY NOT WORKING!!!
 */
router.put<{ key: string }, any, any>('/make-private/:key', async (req, res) =>
  fileManager
    .makePrivate(req.params.key)
    .then(() => res.status(204).end())
    .catch(() => res.status(500).end())
);

/**
 * PUT /api/file/make-public/:key
 * Private
 * Make file public
 */
router.put<{ key: string }, any, any>('/make-public/:key', async (req, res) =>
  fileManager
    .makePublic(req.params.key)
    .then(() => res.status(204).end())
    .catch(() => res.status(500).end())
);
export default router;
