const { CartProduct } = require("../models");
const { Op } = require("sequelize");

async function clearOldCartProducts() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  try {
    const deleted = await CartProduct.destroy({
      where: { updatedAt: { [Op.lt]: threeDaysAgo } },
    });

    console.log(`Deleted ${deleted} items.`);

    console.log(`Old cart products removed.`);
  } catch (error) {
    console.error("Error clearing cart products:", error);
  }
}

clearOldCartProducts();
