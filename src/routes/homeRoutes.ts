import { Router } from 'express';
import { HomeController } from '../controllers/HomeController.ts';

const router = Router();
router.get('/', HomeController.index);

export default router;
