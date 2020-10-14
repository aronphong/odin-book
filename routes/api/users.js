const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// require controller modules
const {
  login_post,
  signup_post,
  friends_get,
  friend_request_post,
  friends_update_post,
} = require("../../controllers/userController");

// require validator modules
const {
  validate_login,
  validate_signup,
} = require("../../validators/userValidator");

const User = require("../../models/User");

// Test Route
router.get("/", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST user login
router.post("/login", validate_login, login_post);

// POST user sign up
router.post("/sign-up", validate_signup, signup_post);

// GET all friends
router.get("/friends", [auth], friends_get);

// POST update friends
router.post("/friends", [auth], friends_update_post);

// POST friend request
router.post("/user/:id", [auth], friend_request_post);

module.exports = router;
