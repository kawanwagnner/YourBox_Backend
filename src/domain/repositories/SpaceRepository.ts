import { SpaceModel } from '../../models/SpaceModel.ts';
import { SpaceMemberModel } from '../../models/SpaceMemberModel.ts';
import type { Space, SpaceMember } from '../../types/domain.ts';

export const SpaceRepository = {
  async create(data: { name: string; ownerId: string; slug?: string; passwordHash?: string }): Promise<Space> {
    const space = new SpaceModel(data as any);
    await space.save();
    // add owner as member
    await SpaceMemberModel.create({ spaceId: String(space._id), userId: data.ownerId, role: 'OWNER' } as Partial<SpaceMember>);
    return { ...(space.toObject() as any), id: String(space._id) } as Space;
  },
  async findById(id: string): Promise<Space | null> {
    const s = await SpaceModel.findById(id).lean();
    if (!s) return null;
    return { ...(s as any), id: String((s as any)._id) } as Space;
  },
  async listByUser(userId: string): Promise<Space[]> {
    const memberships = await SpaceMemberModel.find({ userId }).lean();
    const spaceIds = memberships.map(m => m.spaceId);
    const spaces = await SpaceModel.find({ _id: { $in: spaceIds } }).lean();
    return (spaces as any[]).map(s => ({ ...(s as any), id: String((s as any)._id) } as Space));
  },
  async findByOwnerAndName(ownerId: string, name: string): Promise<Space | null> {
    const s = await SpaceModel.findOne({ ownerId, name }).lean();
    if (!s) return null;
    return { ...(s as any), id: String((s as any)._id) } as Space;
  },
  async update(id: string, ownerId: string, data: { name?: string; slug?: string; passwordHash?: string }): Promise<Space | null> {
    // only allow update when ownerId matches
    const updated = await SpaceModel.findOneAndUpdate({ _id: id, ownerId }, { $set: data }, { new: true }).lean();
    if (!updated) return null;
    return { ...(updated as any), id: String((updated as any)._id) } as Space;
  },
  async delete(id: string, ownerId: string): Promise<{ deletedCount?: number }> {
    // delete space only if ownerId matches
    const res = await SpaceModel.deleteOne({ _id: id, ownerId });
    // cleanup members and items
    try {
      await SpaceMemberModel.deleteMany({ spaceId: id });
    } catch (e) {}
    try {
      // lazy import ItemModel to avoid cyclic issues
      // Node ESM require dynamic import
      const mod = await import('../../models/ItemModel.ts');
      const ItemModel = (mod as any).ItemModel || (mod as any).default;
      if (ItemModel) await ItemModel.deleteMany({ spaceId: id });
    } catch (e) {}
    return { deletedCount: (res as any).deletedCount };
  },
};
