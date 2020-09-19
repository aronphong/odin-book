const Post = require("../models/Post");
const User = require("../models/User");

// @route  GET /timeline
// @desc   Get all posts
// @access Private
exports.timeline_posts_get = async (req, res) => {
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
exports.timeline_posts_post = async (req, res) => {
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

// @todo   Get posts by ID
// @route  GET /timeline/post/:id
// @desc   Get post by ID
// @access Private

// @todo   Like a post by ID
// @route  PUT /timeline/like/:id
// @desc   Get post by ID
// @access Private
