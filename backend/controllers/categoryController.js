const { Category, sequelize } = require("../models");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoriesSelect = async (req, res) => {
  console.log("authh", req.headers.authorization);

  try {
    const categories = await sequelize.query("SELECT id AS value, name AS label FROM categories", { type: sequelize.QueryTypes.SELECT });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = { getCategories, getCategoriesSelect };
