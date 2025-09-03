import { AuthService } from '../../domain/services/AuthService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto.ts';
import type { Request, Response, NextFunction } from 'express';

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
  
  async me(req: any, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getMe((req as any).user.id);
      res.json(user);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
