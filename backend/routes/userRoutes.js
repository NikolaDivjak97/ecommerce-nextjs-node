const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const { getUser, storeUser, updateUser, deleteUser, table } = require("../controllers/userController");

router.post("/store", authMiddleware, adminMiddleware, storeUser);
router.get("/table", authMiddleware, adminMiddleware, table);
router.post("/update/:id", authMiddleware, adminMiddleware, updateUser);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteUser);
router.get("/:id", authMiddleware, adminMiddleware, getUser);

module.exports = router;
