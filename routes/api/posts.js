const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// require controller modules
const {
  timeline_posts_get,
  timeline_posts_post,
} = require("../../controllers/postController");

// require validator modules
const { validate_post } = require("../../validators/postvalidator");

// require models
const Post = require("../../models/Post");

// GET all posts
router.get("/timeline", [auth], timeline_posts_get);

// POST create post
router.post("/timeline", [auth, validate_post], timeline_posts_post);

// DELETE delete post
// PUT like post
// PUT unlike post
// PUT comment post
// DELETE delete comment on post

module.exports = router;
