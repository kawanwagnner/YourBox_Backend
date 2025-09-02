import { prisma } from '../../db/prisma.js';

export const UserRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  async create(data: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({ data });
  },
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
