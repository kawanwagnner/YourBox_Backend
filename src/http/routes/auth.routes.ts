import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.ts';
import { authMiddleware } from '../middlewares/auth.ts';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', authMiddleware, AuthController.me);
router.get('/alive', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
