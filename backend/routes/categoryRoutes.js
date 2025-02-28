const express = require("express");
const router = express.Router();

const { getCategories, getCategoriesSelect } = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/select", getCategoriesSelect);

module.exports = router;
