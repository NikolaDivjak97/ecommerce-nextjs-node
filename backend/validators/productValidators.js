const { body } = require("express-validator");

const storeProductValidationRules = [
  body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
  body("stock").notEmpty().withMessage("Stock is required").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("price").notEmpty().withMessage("Price is required").isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
  body("categories").notEmpty().withMessage("At least one category is required").isArray({ min: 1 }).withMessage("Categories must be an array with at least one item"),
];

module.exports = { storeProductValidationRules };
