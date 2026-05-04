import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.ts";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User"
  }
);

export default User;