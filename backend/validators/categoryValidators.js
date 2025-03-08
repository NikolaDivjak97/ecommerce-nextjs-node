const { body } = require("express-validator");

const storeCategoryValidationRules = [
  body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string"),
  body("icon").custom((value, { req }) => {
    if (!req.files) {
      throw new Error("Icon is required.");
    }
    return true;
  }),
];

const updateCategoryValidationRules = [body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"), body("description").notEmpty().withMessage("Description is required").isString().withMessage("Description must be a string")];

module.exports = { storeCategoryValidationRules, updateCategoryValidationRules };
