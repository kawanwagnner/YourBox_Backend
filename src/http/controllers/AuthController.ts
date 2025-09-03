import { AuthService } from '../../domain/services/AuthService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto.ts';
import type { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: string; [key: string]: any };
}

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = RegisterDTO.parse(req.body);
      const user = await AuthService.register(name, email, password);
      res.cookie('auth', user.token, { httpOnly: true });
      return res.json(user);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = LoginDTO.parse(req.body);
      const user = await AuthService.login(email, password);
      res.cookie('auth', user.token, { httpOnly: true });
      return res.json(user);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },

  async logout(req: Request, res: Response) {
    res.clearCookie('auth');
    res.json({ ok: true });
  },
  
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as AuthenticatedRequest).user.id;
      const user = await AuthService.getMe(userId);
      return res.json(user);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  }
};
