const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// require controller modules
const {
  my_profile_get,
  profile_get,
  profiles_get,
  profile_delete,
} = require("../../controllers/profileController");

// require validator modules

// GET current user profile
router.get("/me", [auth], my_profile_get);

// GET all profiles
router.get("/profiles", [auth], profiles_get);

// DELETE profile, user & posts
router.delete("/me", [auth], profile_delete);

// GET specific user profile
router.get("/:id", [auth], profile_get);

/* @todo
    Update user profile
*/

module.exports = router;
