const express = require('express');
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes');

const router = express.Router();

// Auth
router.use('/api/auth', authRoutes);

// Products
router.use('/api/products', productRoutes);

module.exports = router;
