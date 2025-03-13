"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: "category_product",
        foreignKey: "productId",
        otherKey: "categoryId",
      });

      Product.belongsToMany(models.Cart, {
        through: models.CartProduct,
        foreignKey: "productId",
        otherKey: "cartId",
      });

      Product.hasMany(models.Image, {
        foreignKey: "productId",
        as: "images",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      slug: DataTypes.STRING,
      main_image: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
