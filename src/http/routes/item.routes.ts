import { Router } from 'express';
import { ItemController } from '../controllers/ItemController.js';
import { upload } from '../../libs/upload.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', authMiddleware, ItemController.list);
router.post('/', authMiddleware, upload.single('file'), ItemController.create);
router.delete('/:id', authMiddleware, ItemController.delete);

export default router;
