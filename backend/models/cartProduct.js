"use strict";
const { Model } = require("sequelize");
const { Cart } = require("../models/cart");

module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    static associate(models) {
      CartProduct.belongsTo(models.Cart, { foreignKey: "cartId", onDelete: "CASCADE" });
      CartProduct.belongsTo(models.Product, { foreignKey: "productId", onDelete: "CASCADE" });
    }
  }

  CartProduct.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Carts",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartProduct",
      tableName: "cart_product",
      timestamps: true,
      primaryKey: false,
    }
  );

  return CartProduct;
};
