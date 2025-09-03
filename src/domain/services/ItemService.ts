import { Realtime } from '../events/Realtime.ts';
import { ItemRepository } from '../repositories/ItemRepository.ts';

export const ItemService = {
  async list(spaceId: string) {
    return ItemRepository.listBySpace(spaceId);
  },
  async create({ content, fileUrl, spaceId, createdBy }: { content?: string; fileUrl?: string; spaceId: string; createdBy: string }) {
  const payload: { spaceId: string; createdBy: string; content?: string; fileUrl?: string } = { spaceId, createdBy };
  if (typeof content === 'string') payload.content = content;
  if (typeof fileUrl === 'string') payload.fileUrl = fileUrl;
  const item = await ItemRepository.create(payload);
    Realtime.emitToRoom(`space:${spaceId}`, 'item:created', item);
    return item;
  },
  async delete(id: string, spaceId: string) {
    await ItemRepository.delete(id, spaceId);
    Realtime.emitToRoom(`space:${spaceId}`, 'item:deleted', { id });
    return { id };
  },
};
