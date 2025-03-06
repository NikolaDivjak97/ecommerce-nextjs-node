const { Order, sequelize } = require("../models");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const table = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const columns = ["id", "userId", "total"];

    const orders = await Order.findAll({
      limit: pageSize,
      offset: offset,
      attributes: columns,
    });

    const total = await Order.count();

    res.json({ orders, columns, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getOrders, table };
