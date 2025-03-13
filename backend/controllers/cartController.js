const { Cart, Product, CartProduct } = require("../models");

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

const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProductsWithDetails = await CartProduct.findAll({
      where: { cartId: cart.id },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "main_image"],
        },
      ],
    });

    const cartProducts = cartProductsWithDetails.map((cartProduct) => ({
      id: cartProduct.Product.id,
      name: cartProduct.Product.name,
      main_image: cartProduct.Product.main_image,
      quantity: cartProduct.quantity,
    }));

    res.json({ cartProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const AddToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    const { productId, quantity } = req.body;

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartProduct) {
      return res.status(403).json({ message: "Product already in cart." });
    }

    await CartProduct.create({ cartId: cart.id, productId, quantity });

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(404).json({ message: "Invalid quantity." });
    }

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartProduct) {
      return res.status(403).json({ message: "Product not in cart." });
    }

    await cartProduct.update({ quantity });

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const { productId } = req.body;

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartProduct) {
      return res.status(403).json({ message: "Product not in cart." });
    }

    await cartProduct.destroy();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCartCount, getCartItems, AddToCart, updateQuantity, removeProduct };
