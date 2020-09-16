const express = require("express");
const router = express.Router();

// require controller modules
const user_controller = require("../../controllers/userController");

// require validator modules
const user_validator = require("../../validators/userValidator");

// GET user login
router.get("/login", user_controller.login_get);

// POST user login
router.post("/login", user_controller.login_post);

// GET user sign up
router.get("/sign-up", user_controller.signup_get);

// POST user sign up
router.post("/sign-up", user_validator.signup, user_controller.signup_post);

module.exports = router;
