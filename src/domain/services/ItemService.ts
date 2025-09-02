import { Realtime } from '../events/Realtime.ts';
import { ItemRepository } from '../repositories/ItemRepository.ts';

export const ItemService = {
  async list(userId: string) {
    return ItemRepository.listByUser(userId);
  },
  async create({ content, fileUrl, ownerId }: { content?: string; fileUrl?: string; ownerId: string }) {
  const payload: { ownerId: string; content?: string; fileUrl?: string } = { ownerId };
  if (typeof content === 'string') payload.content = content;
  if (typeof fileUrl === 'string') payload.fileUrl = fileUrl;
  const item = await ItemRepository.create(payload);
    Realtime.emitToUser(ownerId, 'item:created', item);
    return item;
  },
  async delete(id: string, ownerId: string) {
    await ItemRepository.delete(id, ownerId);
    Realtime.emitToUser(ownerId, 'item:deleted', { id });
    return { id };
  },
};
