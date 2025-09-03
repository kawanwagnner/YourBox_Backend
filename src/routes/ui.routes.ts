import { Router } from 'express';
const router = Router();

router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/dashboard', (req, res) => res.render('dashboard'));
router.get('/space/:id', (req, res) => res.render('space', { spaceId: req.params.id }));

export default router;
