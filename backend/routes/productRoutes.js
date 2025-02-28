const express = require("express");
const validate = require("../validators/validator");
const { storeProductValidationRules } = require("../validators/productValidators");
const router = express.Router();

const { getProducts, getProduct, storeProduct, table } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/store", validate(storeProductValidationRules), storeProduct);
router.get("/table", table);
router.get("/:id", getProduct);

module.exports = router;
