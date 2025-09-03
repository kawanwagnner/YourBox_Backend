import { verifyJwt } from '../../libs/jwt.ts';
import { UserRepository } from '../../domain/repositories/UserRepository.ts';
import type { User } from '../../types/domain.ts';

export async function authMiddleware(req: any, res: any, next: any) {
  const token = req.cookies?.auth || req.headers.authorization?.replace('Bearer ', '');
  // token is required
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'No token' } });
  try {
    const payload = verifyJwt(token) as Record<string, unknown>;
    let id = typeof payload === 'object' && ('id' in payload ? (payload as any).id : (payload as any)._id);
    let user: User | null = null;
    if (!id && payload?.email && typeof payload.email === 'string') {
      user = await UserRepository.findByEmail(payload.email as string);
      if (user) id = user.id ?? ((user as any)._id ? String((user as any)._id) : undefined);
    }
    if (!user && id) user = await UserRepository.findById(String(id));
    if (!user) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'User not found' } });
  const uid = user.id ?? ((user as any)._id ? String((user as any)._id) : undefined);
    req.user = { id: uid, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
  }
}
