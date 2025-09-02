import { verifyJwt } from '../../libs/jwt.js';
import { UserRepository } from '../../domain/repositories/UserRepository.js';

export async function authMiddleware(req: any, res: any, next: any) {
  const token = req.cookies?.auth || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'No token' } });
  try {
    const payload = verifyJwt(token);
    const id = typeof payload === 'object' && 'id' in payload ? (payload as any).id : undefined;
    if (!id) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token payload' } });
    const user = await UserRepository.findById(id);
    if (!user) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User not found' } });
    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
  }
}
