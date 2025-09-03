import { SpaceService } from '../../domain/services/SpaceService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import type { Space } from '../../types/domain.ts';
import type { Request, Response, NextFunction } from 'express';

export const SpaceController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body as { name: string };
      const user = (req as any).user;
      if (!user || !user.id) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
      const space: Space = await SpaceService.create({ name, ownerId: user.id });
      res.json(space);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      const spaces = await SpaceService.list(user.id);
      res.json(spaces);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      // validate basic ObjectId format
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      const space = await SpaceService.findById(id);
      if (!space) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Space not found' } });
      res.json(space);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      // only OWNER can update
      if ((req as any).space?.role !== 'OWNER') return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Only owner can update space' } });
  const { name } = req.body as { name?: string };
  const data: { name?: string } = {};
  if (typeof name === 'string') data.name = name;
  const updated = await SpaceService.update(id, (req as any).user.id, data);
      res.json(updated);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      if ((req as any).space?.role !== 'OWNER') return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Only owner can delete space' } });
      await SpaceService.delete(id, (req as any).user.id);
      res.json({ ok: true });
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
