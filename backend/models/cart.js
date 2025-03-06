"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Cart.belongsToMany(models.Product, {
        through: "cart_product",
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
    }
  );
  return Cart;
};
