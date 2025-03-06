const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const { getOrders, table } = require("../controllers/orderController");

router.get("/", authMiddleware, adminMiddleware, getOrders);
router.get("/table", authMiddleware, adminMiddleware, table);

module.exports = router;
