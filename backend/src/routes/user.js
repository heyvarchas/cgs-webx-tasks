const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/auth");

const router = express.Router();

// ----------------------------------------
// GET /api/user/me
// Returns the logged-in user's profile
// ----------------------------------------
router.get("/me", protect, async (req, res) => {
  try {
    res.status(200).json({
      username: req.user.username,
      description: req.user.description,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------
// PUT /api/user/me
// Updates the logged-in user's description
// ----------------------------------------
router.put("/me", protect, async (req, res) => {
  try {
    const { description } = req.body;

    // Check if description was provided
    if (description === undefined) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Find the user and update their description
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { description },
      { new: true }
    ).select("-hashed_password");

    res.status(200).json({
      message: "Description updated successfully",
      username: updatedUser.username,
      description: updatedUser.description,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;