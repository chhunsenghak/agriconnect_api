import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert("roles", [
    {
      id: 1,
      name: "admin",
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "association",
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "individual",
      createdAt: new Date(), 
      updatedAt: new Date()
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete("roles", {});
}
