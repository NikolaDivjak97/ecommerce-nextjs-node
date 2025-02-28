const express = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");

const router = express.Router();

// Auth
router.use("/api/auth", authRoutes);

// Products
router.use("/api/products", productRoutes);

//
router.use("/api/categories", categoryRoutes);

module.exports = router;
