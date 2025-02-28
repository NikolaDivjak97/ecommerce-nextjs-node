"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Image.init(
    {
      productId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
