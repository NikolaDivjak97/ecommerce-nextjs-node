const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use("/test", protect);

// Auth
router.use("/api/auth", authRoutes);

// Products
router.use("/api/products", productRoutes);

//
router.use("/api/categories", categoryRoutes);

module.exports = router;
