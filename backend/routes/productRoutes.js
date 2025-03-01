const express = require("express");
const validate = require("../validators/validator");
const { storeProductValidationRules } = require("../validators/productValidators");
const upload = require("../config/multerConfig");

const router = express.Router();

const { getProducts, getProduct, editProduct, storeProduct, table } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/store", upload, validate(storeProductValidationRules), storeProduct);
router.get("/table", table);
router.get("/edit/:id", editProduct);
router.get("/:id", getProduct);

module.exports = router;
