const Post = require("../models/Post");
const User = require("../models/User");
// const Profile = require("../models/Profile");

// @route  GET /profiles
// @desc   Get all profiles
// @access Private
exports.profiles_get = async (req, res) => {
  try {
    const profiles = await User.find({}).select(["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  GET /me
// @desc   Get current user profile
// @access Private
exports.my_profile_get = async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select([
      "name",
      "avatar",
      "friends",
      "bio",
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "No profile for user found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @todo
// @route  POST /me
// @desc   Update user profile
// @access Private

// @route  GET /:id
// @desc   Get specific user profile
// @access Private
exports.profile_get = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select([
      "name",
      "avatar",
      "friends",
      "bio",
    ]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  DELETE /me
// @desc   Delete profile, user & posts
// @access Private
exports.profile_delete = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    // await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
