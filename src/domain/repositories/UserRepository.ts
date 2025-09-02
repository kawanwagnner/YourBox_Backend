import { UserModel } from '../../models/UserModel.ts';

export const UserRepository = {
  async findByEmail(email: string): Promise<any> {
    return UserModel.findOne({ email }).lean();
  },
  async create(data: { name: string; email: string; passwordHash: string }): Promise<any> {
    const user = new UserModel(data);
    return user.save();
  },
  async findById(id: string): Promise<any> {
    return UserModel.findById(id).lean();
  },
};
