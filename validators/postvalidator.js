const { check, validationResult } = require("express-validator");

exports.validate_post = [
  check("text", "Text is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errrors.array() });
    }
    next();
  },
];
