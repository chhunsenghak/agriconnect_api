import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Umzug, SequelizeStorage } from "umzug";
import type { QueryInterface } from "sequelize";
import sequelize from "../config/database.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const migrator = new Umzug({
  migrations: {
    glob: ["[0-9]*.{js,ts}", { cwd: path.join(__dirname, "migrations") }],
    resolve: ({ name, path: filePath, context }) => ({
      name,
      up: async () => {
        const mod = await import(pathToFileURL(filePath!).href);
        const migration = mod.default ?? mod;
        return migration.up(context as QueryInterface);
      },
      down: async () => {
        const mod = await import(pathToFileURL(filePath!).href);
        const migration = mod.default ?? mod;
        return migration.down(context as QueryInterface);
      },
    }),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: "SequelizeMeta",
  }),
  logger: console,
});