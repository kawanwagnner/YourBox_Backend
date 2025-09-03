import { Router } from 'express';
import { SpaceController } from '../controllers/SpaceController.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { spaceAuth } from '../middlewares/spaceAuth.ts';

const router = Router();

router.post('/', authMiddleware, SpaceController.create);
router.get('/', authMiddleware, SpaceController.list);

// routes for specific space
router.get('/:id', authMiddleware, spaceAuth, SpaceController.get);
router.put('/:id', authMiddleware, spaceAuth, SpaceController.update);
router.delete('/:id', authMiddleware, spaceAuth, SpaceController.delete);

export default router;
