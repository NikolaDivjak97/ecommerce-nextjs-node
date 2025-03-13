"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Cart.belongsToMany(models.Product, {
        through: models.CartProduct,
        foreignKey: "cartId",
        otherKey: "productId",
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: true,
    }
  );
  return Cart;
};
