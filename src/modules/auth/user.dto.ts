import User from "./user.model.ts";

export interface UserResponseDTO {
  id: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleId: number;
  profileImage: string | null;
  isVerified: boolean;
}

export interface AuthResponseDTO {
  user: UserResponseDTO;
  accessToken?: string;
}

const toDTO = (user: User): UserResponseDTO => ({
  id: user.id,
  email: user.email,
  phoneNumber: user.phoneNumber,
  address: user.address,
  roleId: user.roleId,
  profileImage: user.profileImage ?? null,
  isVerified: user.isVerified,
});

export const UserDTO = { toDTO };
