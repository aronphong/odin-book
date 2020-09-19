const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// require controller modules
const {
  posts_get,
  posts_post,
  post_detail_get,
} = require("../../controllers/postController");

// require validator modules
const { validate_post } = require("../../validators/postvalidator");

// GET all posts
router.get("/", [auth], posts_get);

// POST create post
router.post("/", [auth, validate_post], posts_post);

// Get post by ID
router.get("/post/:id", [auth], post_detail_get);

// DELETE delete post
router.delete("/post/:id", [auth], post_detail_delete);

// @todo
// PUT like post
// PUT unlike post
// PUT comment post
// DELETE delete comment on post

module.exports = router;
