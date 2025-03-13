const express = require("express");
const validate = require("../validators/validator");
const { storeProductValidationRules, updateProductValidationRules } = require("../validators/productValidators");
const upload = require("../config/multerConfig");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const { getProducts, getProduct, getProductBySlug, editProduct, storeProduct, updateProduct, deleteProduct, table } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/store", authMiddleware, adminMiddleware, upload.fields([{ name: "main_image", maxCount: 1 }, { name: "images" }]), validate(storeProductValidationRules), storeProduct);
router.get("/table", authMiddleware, adminMiddleware, table);
router.get("/edit/:id", authMiddleware, adminMiddleware, editProduct);
router.post("/update/:id", authMiddleware, adminMiddleware, upload.single("main_image"), validate(updateProductValidationRules), updateProduct);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProduct);

module.exports = router;
