const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

// @route  GET /me
// @desc   Get current user profile
// @access Private
exports.my_profile_get = async (req, res) => {
  try {
    const profile = await (
      await Profile.findOne({ user: req.user.id })
    ).populated("user", ["name", "avatar", "friends"]);

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

// @route  GET /profiles
// @desc   Get all profiles
// @access Private
exports.profiles_get = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  GET /:id
// @desc   Get specific user profile
// @access Private
exports.profile_get = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar", "friends"]);

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
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
