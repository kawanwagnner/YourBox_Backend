import { ItemService } from '../../domain/services/ItemService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { CreateItemDTO } from '../dtos/item.dto.js';

export const ItemController = {
  async list(req: any, res: any, next: any) {
    try {
      const items = await ItemService.list(req.user.id);
      res.json(items);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async create(req: any, res: any, next: any) {
    try {
      const content: string | undefined = req.body.content ?? undefined;
      const fileUrl: string | undefined = req.file?.filename ? `/uploads/${req.file.filename}` : undefined;
      const data = CreateItemDTO.parse({ content, fileUrl });
      const payload: { ownerId: string; content?: string; fileUrl?: string } = {
        ownerId: req.user.id
      };
      if (typeof content === 'string') payload.content = content;
      if (typeof fileUrl === 'string') payload.fileUrl = fileUrl;
      const item = await ItemService.create(payload);
      res.json(item);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
  async delete(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const result = await ItemService.delete(id, req.user.id);
      res.json(result);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
