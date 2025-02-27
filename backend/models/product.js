'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: 'category_product',
        foreignKey: 'productId',
        otherKey: 'categoryId',
      });
    }
  }
  Product.init({
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  
  return Product;
};