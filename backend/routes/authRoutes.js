const express = require("express");
const { register, login, logout, authenticate } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateToken, authenticate);

module.exports = router;
