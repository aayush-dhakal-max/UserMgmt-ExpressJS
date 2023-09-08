const { check, validationResult } = require("express-validator");

const registerValidate = [
  check("fname", "Enter a valid string").trim().escape(),
  check("lname", "Enter a valid string").trim().escape(),
  check("email", "Email input must be a valid Email Address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  check("bio").trim().escape(),
  check("phonenum").trim().escape(),
  check("designation").trim().escape(),
  check("company").trim().escape(),
];

module.exports = { registerValidate };
