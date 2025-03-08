const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const validate = require("../validators/validator");
const { storeCategoryValidationRules, updateCategoryValidationRules } = require("../validators/categoryValidators");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getCategories, getCategory, getCategoriesSelect, storeCategory, updateCategory, deleteCategory, table } = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/store", authMiddleware, adminMiddleware, upload.array("icon"), validate(storeCategoryValidationRules), storeCategory);
router.post("/update/:id", authMiddleware, adminMiddleware, upload.array("icon"), validate(updateCategoryValidationRules), updateCategory);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteCategory);
router.get("/select", authMiddleware, adminMiddleware, getCategoriesSelect);
router.get("/table", authMiddleware, adminMiddleware, table);
router.get("/:id", getCategory);

module.exports = router;
