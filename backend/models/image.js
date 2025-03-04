"use strict";
const fs = require("fs");
const path = require("path");
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

  Image.beforeDestroy(async (image) => {
    const imagePath = path.join(process.cwd(), image.path);
    console.log("PATH", imagePath);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  });

  return Image;
};
