import User from "../models/user.ts";

export const UserDAO = {
  findByPhoneNumber: async (phoneNumber: string) => {
    return await User.findOne({ where: { phoneNumber } });
  },

  findByEmail: async (email: string) => {
    return await User.findOne({ where: { email } });
  },

  findById: async (id: number) => {
    return await User.findByPk(id);
  },

  create: async (email: string, password: string, phoneNumber: string) => {
    return await User.create({ email, password, phoneNumber });
  },

  update: async (id: number, updates: Partial<{ email: string; password: string; phoneNumber: string }>) => {
    return await User.update(updates, { where: { id } });
  },

  deleteById: async (id: number) => {
    return await User.destroy({ where: { id } });
  }
};
