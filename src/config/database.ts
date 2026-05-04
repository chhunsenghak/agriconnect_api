import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

if (!POSTGRES_DB || !POSTGRES_USERNAME || !POSTGRES_PASSWORD) {
  console.log(POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD);
  throw new Error("Missing database environment variables");
}

const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    dialect: "postgres",
    port: Number(POSTGRES_PORT) || 5432,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;