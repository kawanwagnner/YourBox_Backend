import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: path.resolve('uploads'),
  filename: (req: any, file: any, cb: any) => {
    const userId = req.user?.id || 'anon';
    const ext = path.extname(file.originalname);
    const name = `${userId}-${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, name);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/', 'application/pdf', 'text/plain'];
    if (allowed.some(type => file.mimetype.startsWith(type))) cb(null, true);
    else cb(new Error('Invalid file type'));
  },
});
