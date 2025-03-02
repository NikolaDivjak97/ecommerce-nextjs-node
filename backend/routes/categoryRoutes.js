const express = require("express");
const router = express.Router();

const { getCategories, getCategoriesSelect, storeCategory, table } = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/store", storeCategory);
router.get("/select", getCategoriesSelect);
router.get("/table", table);

module.exports = router;
