import { Router } from 'express';
import { ItemController } from '../controllers/ItemController.ts';
import { upload } from '../../libs/upload.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { spaceAuth } from '../middlewares/spaceAuth.ts';

const router = Router({ mergeParams: true });

// routes: /api/spaces/:spaceId/items
router.get('/', authMiddleware, spaceAuth, ItemController.list);
router.post('/', authMiddleware, spaceAuth, upload.single('file'), ItemController.create);
router.delete('/:id', authMiddleware, spaceAuth, ItemController.delete);

export default router;
