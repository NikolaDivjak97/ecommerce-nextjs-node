const { validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorObject = errors.array().reduce((acc, err) => {
      acc[err.path] = err.msg;
      return acc;
    }, {});

    res.status(400).json({ errors: errorObject });
  };
};

module.exports = validate;
