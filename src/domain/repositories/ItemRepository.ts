import { ItemModel } from '../../models/ItemModel.ts';

export const ItemRepository = {
  async listBySpace(spaceId: string): Promise<any> {
    return ItemModel.find({ spaceId }).sort({ createdAt: -1 }).lean();
  },
  async create(data: { content?: string; fileUrl?: string; spaceId: string; createdBy: string }): Promise<any> {
    const item = new ItemModel(data as any);
    return item.save();
  },
  async delete(id: string, spaceId: string): Promise<any> {
    return ItemModel.deleteMany({ _id: id, spaceId });
  },
};
