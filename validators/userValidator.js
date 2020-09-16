const { check, validationResult } = require("express-validator");

exports.signup = [
  check("name", "Name is required").trim().isnot().isEmpty(),
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
