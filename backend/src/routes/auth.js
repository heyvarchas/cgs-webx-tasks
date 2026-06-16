const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Helper function to generate a JWT token for a user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ----------------------------------------
// POST /api/auth/signup
// Creates a new user account
// ----------------------------------------
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if both fields were provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if username is already taken
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Create the new user (password gets hashed automatically via pre-save hook)
  const user = await User.create({
    username,
    hashed_password: password,
  });

  res.status(201).json({
    message: "Account created successfully",
    token: generateToken(user._id),
  });
});

// ----------------------------------------
// POST /api/auth/signin
// Logs in an existing user
// ----------------------------------------
router.get("/signin", async (req, res) => {
  const { username, password } = req.query;

  // Check if both fields were provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Find the user by username
  const user = await User.findOne({ username });

  // Check if user exists and password matches
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({
    message: "Signed in successfully",
    token: generateToken(user._id),
  });
});

module.exports = router;