const express = require('express');
const { register, login, authenticate } = require('../controllers/authController');
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, authenticate);

module.exports = router;
