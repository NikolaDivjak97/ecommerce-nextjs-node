const { body } = require("express-validator");

const updateAccountValidationRules = [body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"), body("email").notEmpty().withMessage("Description is required").isEmail().withMessage("Invalid email")];

module.exports = { updateAccountValidationRules };
