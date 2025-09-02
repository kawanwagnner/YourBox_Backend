import { prisma } from '../../db/prisma.ts';

export const ItemRepository = {
  async listByUser(userId: string) {
    return prisma.item.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  },
  async create(data: { content?: string; fileUrl?: string; ownerId: string }) {
    return prisma.item.create({ data });
  },
  async delete(id: string, ownerId: string) {
    return prisma.item.deleteMany({ where: { id, ownerId } });
  },
};
