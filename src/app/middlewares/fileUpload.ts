/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

// Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), '/uploads/')); // Save in `uploads` directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

// File validation
const fileFilter = (req: Request, file: any, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

export const uploadSingle = multer({ storage, fileFilter }).single('file');
export const uploadMultiple = multer({ storage, fileFilter }).array(
  'files',
  10,
); // Max 10 files
