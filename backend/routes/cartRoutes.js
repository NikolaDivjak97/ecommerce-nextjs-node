const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const { getCartCount } = require("../controllers/cartController");

router.get("/cart-count", authMiddleware, getCartCount);

module.exports = router;
