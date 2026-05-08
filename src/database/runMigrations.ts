import { migrator } from "./migrator.ts";

const command = process.argv[2];

(async () => {
  try {
    if (command === "down") {
      await migrator.down();
      console.log("✅ Last migration reverted");
    } else if (command === "reset") {
      await migrator.down({ to: 0 });
      console.log("✅ All migrations reverted");
    } else {
      await migrator.up();
      console.log("✅ Migrations complete");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
})();
