import { SpaceRepository } from '../repositories/SpaceRepository.ts';
import type { Space } from '../../types/domain.ts';

export const SpaceService = {
  async create(params: { name: string; ownerId: string; slug?: string; passwordHash?: string }): Promise<Space> {
    const { name, ownerId, slug, passwordHash } = params;
    // prevent duplicate name per owner
    const existing = await SpaceRepository.findByOwnerAndName(ownerId, name);
    if (existing) throw new Error('Space with this name already exists');
    return SpaceRepository.create({ name, ownerId, slug: slug as any, passwordHash: passwordHash as any });
  },
  async list(userId: string): Promise<Space[]> {
    return SpaceRepository.listByUser(userId);
  },
  async findById(id: string): Promise<Space | null> {
    return SpaceRepository.findById(id);
  },
  async update(id: string, ownerId: string, data: { name?: string; slug?: string; passwordHash?: string }): Promise<Space | null> {
    // if name provided, ensure uniqueness
    if (data.name) {
      const existing = await SpaceRepository.findByOwnerAndName(ownerId, data.name);
      if (existing && String(existing._id) !== String(id)) throw new Error('Space with this name already exists');
    }
    return SpaceRepository.update(id, ownerId, data);
  },
  async delete(id: string, ownerId: string): Promise<{ deletedCount?: number }> {
    return SpaceRepository.delete(id, ownerId);
  },
};
