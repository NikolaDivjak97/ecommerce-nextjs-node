const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const { getCartCount, getCartItems, AddToCart, updateQuantity, removeProduct } = require("../controllers/cartController");

router.get("/count", authMiddleware, getCartCount);
router.get("/items", authMiddleware, getCartItems);
router.post("/items/add", authMiddleware, AddToCart);
router.post("/items/update-quantity", authMiddleware, updateQuantity);
router.post("/items/remove", authMiddleware, removeProduct);

module.exports = router;
