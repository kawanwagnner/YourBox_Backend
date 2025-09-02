import { Router } from 'express';
import { ItemController } from '../controllers/ItemController.ts';
import { upload } from '../../libs/upload.ts';
import { authMiddleware } from '../middlewares/auth.ts';

const router = Router();

router.get('/', authMiddleware, ItemController.list);
router.post('/', authMiddleware, upload.single('file'), ItemController.create);
router.delete('/:id', authMiddleware, ItemController.delete);

export default router;
