import { ItemModel } from '../../models/ItemModel.ts';

export const ItemRepository = {
  async listByUser(userId: string): Promise<any> {
    return ItemModel.find({ ownerId: userId }).sort({ createdAt: -1 }).lean();
  },
  async create(data: { content?: string; fileUrl?: string; ownerId: string }): Promise<any> {
    const item = new ItemModel(data as any);
    return item.save();
  },
  async delete(id: string, ownerId: string): Promise<any> {
    return ItemModel.deleteMany({ _id: id, ownerId });
  },
};
