import { UserRepository } from '../repositories/UserRepository.ts';
import { signJwt } from '../../libs/jwt.ts';
import { comparePassword, hashPassword } from '../../libs/hash.ts';

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const passwordHash = await hashPassword(password);
    const user = await UserRepository.create({ name, email, passwordHash });
  const uid = (user.id ?? (user._id ? String(user._id) : undefined));
  const token = signJwt({ id: uid, email: user.email });
  return { id: uid, name: user.name, email: user.email, token };
  },
  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');
  const uid = (user.id ?? (user._id ? String(user._id) : undefined));
  const token = signJwt({ id: uid, email: user.email });
  return { id: uid, name: user.name, email: user.email, token };
  },
  async getMe(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    return { id: user.id, name: user.name, email: user.email };
  },
};
