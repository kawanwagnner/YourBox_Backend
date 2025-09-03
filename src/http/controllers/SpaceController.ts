import { SpaceService } from '../../domain/services/SpaceService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import type { Space } from '../../types/domain.ts';

export const SpaceController = {
  async create(req: any, res: any, next: any) {
    try {
  const { name } = req.body;
  if (!req.user || !req.user.id) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
  const space: Space = await SpaceService.create({ name, ownerId: req.user.id });
      res.json(space);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async list(req: any, res: any, next: any) {
    try {
      const spaces = await SpaceService.list(req.user.id);
      res.json(spaces);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async get(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
  // validate basic ObjectId format
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      const space = await SpaceService.findById(id);
  if (!space) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Space not found' } });
      res.json(space);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async update(req: any, res: any, next: any) {
    try {
  const { id } = req.params;
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      // only OWNER can update
      if (req.space?.role !== 'OWNER') return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Only owner can update space' } });
      const { name } = req.body;
      const updated = await SpaceService.update(id, req.user.id, { name });
      res.json(updated);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async delete(req: any, res: any, next: any) {
    try {
  const { id } = req.params;
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid space id' } });
      if (req.space?.role !== 'OWNER') return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Only owner can delete space' } });
      await SpaceService.delete(id, req.user.id);
      res.json({ ok: true });
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
