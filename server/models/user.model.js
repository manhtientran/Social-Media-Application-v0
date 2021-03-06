import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../sequelize.js";
import crypto from "crypto";

class User extends Model {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }

  encryptPassword(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  }

  makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
}

User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,

      set(value) {
        this._password = value;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(value);
      },

      get() {
        return this._password;
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

(async () => {
  await sequelize.sync({ alter: true });
})();

export default User;
