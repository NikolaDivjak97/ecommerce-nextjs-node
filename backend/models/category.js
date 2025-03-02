"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: "category_product",
        foreignKey: "categoryId",
        otherKey: "productId",
      });
    }
  }
  Category.init(
    {
      isParent: DataTypes.BOOLEAN,
      icon: DataTypes.STRING,
      slug: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
