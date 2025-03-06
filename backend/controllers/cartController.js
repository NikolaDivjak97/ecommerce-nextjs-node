const { Cart, Product } = require("../models");

const getCartCount = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      attributes: ["id"],
      include: [
        {
          model: Product,
          as: "Products",
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    res.json({ count: cart.Products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCartCount };
