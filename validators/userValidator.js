const { check, validationResult } = require("express-validator");

exports.validate_signup = [
  check("name", "Name is required").trim().not().isEmpty(),
  check("email", "Please include a valid email").trim().isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validate_login = [
  check("email", "Please include a valid email").trim().isEmail(),
  check("password", "Password is required").exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
