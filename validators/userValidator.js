const { check, validationResult } = require("express-validator");

const userValidationResult = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // const error = result.array()[0].msg;
    const errors = result.array().map((error) => error.msg);
    return res.status(422).json({ success: false, error: errors });
  }

  next();
};

const userValidator = [
  check("Password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .matches(/\d/)
    .withMessage("Password must contains at least one number")
    .isLength({ min: 9, max: 20 })
    .withMessage("Password must be 9 to 20 charcters long!"),

  check("Email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Please provide a valid email!"),

  check("Age")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Age is required!")
    .isNumeric()
    .withMessage("You can’t insert any character in the age just number!"),
];

module.exports = {
  userValidationResult,
  userValidator,
};
