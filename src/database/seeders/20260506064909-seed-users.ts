import bcrypt from "bcrypt";
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const SALT = 10;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert("users", [
    {
      id: uuidv4(),
      email: "admin@agriconnect.kh",
      password: await bcrypt.hash("Admin@123", SALT),
      phoneNumber: "+85512345678",
      address: null,
      roleId: 1,
      token: null,
      isVerified: true,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: "sroksreak@agriconnect.kh",
      password: await bcrypt.hash("srok@123", SALT),
      phoneNumber: "+85587652222",
      address: null,
      roleId: 2,
      token: null,
      isVerified: true,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      email: "farmer@agriconnect.kh",
      password: await bcrypt.hash("Farmer@123", SALT),
      phoneNumber: "+85587654321",
      address: null,
      roleId: 3,
      token: null,
      isVerified: true,
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete("users", {});
}
