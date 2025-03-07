"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart, {
        foreignKey: "userId",
        as: "cart",
        onDelete: "CASCADE",
      });

      User.hasMany(models.Order, {
        foreignKey: "userId",
        as: "orders",
        onDelete: "SET NULL",
      });
    }
  }
  User.init(
    {
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
