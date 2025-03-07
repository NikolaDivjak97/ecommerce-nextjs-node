const { Product, Image } = require("../models");

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

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { homePage };
