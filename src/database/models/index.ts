import User from "../../modules/auth/user.model.ts";
import Role from "../../modules/role/role.model.ts";

// 🔗 Associations
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

// export all models
export { User, Role };