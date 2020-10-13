require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route  POST /users/sign-up
// @desc   Register user
// @access Public
exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  POST /users/login
// @desc   Authenticate user & get token
// @access Public
exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route GET /friends
// @desc  Get all users friends
// access Private
exports.friends_get = async (req, res) => {
  try {
    const friends = await User.findById(req.user.id).find({ friends });
    res.json(friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route  POST /user/:id
// @desc   Send Friend request
// @access Private
exports.friend_request_post = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // check if user has already sent friend request
    if (
      user.friendRequests.filter(
        (friendReq) => friendReq.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Friend request already sent" });
    }

    // check if users are already friends
    if (
      user.friends.filter((friend) => friend.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "You are already friends" });
    }

    user.friendRequests.unshift({ user: req.user.id });

    await user.save();

    res.json(user.friendRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
