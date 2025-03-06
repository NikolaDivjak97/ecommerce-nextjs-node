"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Order.belongsToMany(models.Product, {
        through: "order_product",
        foreignKey: "orderId",
        otherKey: "productId",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
      userData: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
