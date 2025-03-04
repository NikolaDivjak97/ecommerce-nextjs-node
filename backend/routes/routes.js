const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const imageRoutes = require("./imageRoutes");
const router = express.Router();

// Auth
router.use("/api/auth", authRoutes);

// Products
router.use("/api/products", productRoutes);

// Categories
router.use("/api/categories", categoryRoutes);

// Images
router.use("/api/images", imageRoutes);

module.exports = router;
