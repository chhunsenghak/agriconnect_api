import User from "./user.model.ts";

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

  create: async (
    email: string,
    password: string,
    phoneNumber: string,
    address: string,
    roleId: number,
    profileImage: string,
  ) => {
    return await User.create({
      email,
      password,
      phoneNumber,
      address,
      roleId,
      profileImage,
    });
  },

  update: async (
    id: string,
    updates: Partial<{
      email: string;
      password: string;
      phoneNumber: string;
      address: string,
      roleId: number;
      token: string;
      isVerified: boolean;
    }>,
  ) => {
    return await User.update(updates, { where: { id } });
  },

  deleteById: async (id: number) => {
    return await User.destroy({ where: { id } });
  },
};
