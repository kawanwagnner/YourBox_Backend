import { ItemService } from '../../domain/services/ItemService.ts';
import { ApiResponse } from '../../utils/ApiResponse.ts';
import { CreateItemDTO } from '../dtos/item.dto.ts';

export const ItemController = {
  async list(req: any, res: any, next: any) {
    try {
      const spaceId = req.params.spaceId as string;
      const items = await ItemService.list(spaceId);
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
      const payload: { spaceId: string; createdBy: string; content?: string; fileUrl?: string } = {
        spaceId: req.params.spaceId,
        createdBy: req.user.id,
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
      const spaceId = req.params.spaceId as string;
      const result = await ItemService.delete(id, spaceId);
      res.json(result);
    } catch (err) {
      next(ApiResponse.error(err));
    }
  },
};
