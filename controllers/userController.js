require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route  POST api/users
// @desc   Register user
// @access Public
exports.signup_post = (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    // hash password
    const salt = bcrypt.genSalt(10);
    user.password = bcrypt.hash(password, salt);

    user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
