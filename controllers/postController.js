const Post = require("../models/Post");
const User = require("../models/User");

// @route  GET /timeline
// @desc   Get all posts
// @access Private
exports.posts_get = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  POST /timeline
// @desc   Get all posts
// @access Private
exports.posts_post = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  GET /timeline/post/:id
// @desc   Get post by ID
// @access Private
exports.post_detail_get = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
  }
};

// @route  DELETE /timeline/post/:id
// @desc   Delete post by ID
// @access Private
exports.post_detail_delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    // check user
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete post" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
};

// @todo   Like a post by ID
// @route  PUT /timeline/like/:id
// @desc   Get post by ID
// @access Private
