const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// require controller modules
const {
  posts_get,
  posts_post,
  post_detail_get,
  post_detail_delete,
  post_detail_like_put,
  post_detail_unlike_put,
  post_detail_comment_post,
  post_detail_comment_delete,
} = require("../../controllers/postController");

// require validator modules
const {
  validate_post,
  validate_comment,
} = require("../../validators/postvalidator");

// GET all posts
router.get("/", [auth], posts_get);

// POST create post
router.post("/", [auth, validate_post], posts_post);

// Get post by ID
router.get("/post/:id", [auth], post_detail_get);

// DELETE delete post
router.delete("/post/:id", [auth], post_detail_delete);

// PUT like post
router.put("/post/:post_id/like", [auth], post_detail_like_put);

// PUT unlike post
router.put("/post/:post_id/unlike", [auth], post_detail_unlike_put);

// PUT comment post
router.post(
  "/post/:post_id/comment",
  [auth, validate_comment],
  post_detail_comment_post
);

// DELETE delete comment on post
router.delete(
  "/post/:post_id/comment/:comment_id",
  [auth],
  post_detail_comment_delete
);

module.exports = router;
