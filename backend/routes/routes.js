const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const imageRoutes = require("./imageRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");
const router = express.Router();

// Auth
router.use("/api/auth", authRoutes);

// Users
router.use("/api/users", userRoutes);

// Products
router.use("/api/products", productRoutes);

// Categories
router.use("/api/categories", categoryRoutes);

// Images
router.use("/api/images", imageRoutes);

// Orders
router.use("/api/orders", orderRoutes);

// Cart
router.use("/api/cart", cartRoutes);

module.exports = router;
