import { ItemService } from '../../domain/services/ItemService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import { CreateItemDTO } from '../dtos/item.dto.ts';
import type { Request, Response, NextFunction } from 'express';
import type { Item } from '../../types/domain.ts';

export const ItemController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const spaceId = String(req.params.spaceId);
      const items = await ItemService.list(spaceId);
      res.json(items);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const content: string | undefined = req.body.content ?? undefined;
      const fileUrl: string | undefined = (req as any).file?.filename ? `/uploads/${(req as any).file.filename}` : undefined;
      CreateItemDTO.parse({ content, fileUrl });
      const payload: { spaceId: string; createdBy: string; content?: string; fileUrl?: string } = {
        spaceId: String(req.params.spaceId),
        createdBy: (req as any).user.id,
      };
      if (typeof content === 'string') payload.content = content;
      if (typeof fileUrl === 'string') payload.fileUrl = fileUrl;
      const item: Item = await ItemService.create(payload);
      res.json(item);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const spaceId = String((req as any).params.spaceId);
      const result = await ItemService.delete(id, spaceId);
      res.json(result);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
