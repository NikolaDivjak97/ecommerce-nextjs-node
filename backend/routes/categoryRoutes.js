const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getCategories, getCategory, getCategoriesSelect, storeCategory, updateCategory, deleteCategory, table } = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/store", authMiddleware, adminMiddleware, storeCategory);
router.post("/update/:id", authMiddleware, adminMiddleware, updateCategory);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteCategory);
router.get("/select", authMiddleware, adminMiddleware, getCategoriesSelect);
router.get("/table", authMiddleware, adminMiddleware, table);
router.get("/:id", getCategory);

module.exports = router;
