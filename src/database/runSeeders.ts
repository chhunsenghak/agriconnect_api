import { seeder } from "./seeder.ts";

const command = process.argv[2];

(async () => {
  try {
    if (command === "down") {
      await seeder.down();
      console.log("✅ Last seeder reverted");
    } else if (command === "reset") {
      await seeder.down({ to: 0 });
      console.log("✅ All seeders reverted");
    } else {
      await seeder.up();
      console.log("✅ Seeding complete");
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
})();
