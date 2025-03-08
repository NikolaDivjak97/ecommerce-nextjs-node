const { Product, Image, Category } = require("../models");

const homePage = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Image,
          as: "images",
          limit: 1,
          attributes: ["path"],
        },
      ],
    });

    const categories = await Category.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } });

    res.json({ products, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { homePage };
