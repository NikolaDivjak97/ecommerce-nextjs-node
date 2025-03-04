const express = require("express");
const validate = require("../validators/validator");
const { storeProductValidationRules } = require("../validators/productValidators");
const upload = require("../config/multerConfig");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

const { getProducts, getProduct, editProduct, storeProduct, updateProduct, deleteProduct, table } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/store", authMiddleware, adminMiddleware, upload.array("images"), validate(storeProductValidationRules), storeProduct);
router.get("/table", authMiddleware, adminMiddleware, table);
router.get("/edit/:id", authMiddleware, adminMiddleware, editProduct);
router.post("/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);
router.get("/:id", getProduct);

module.exports = router;
