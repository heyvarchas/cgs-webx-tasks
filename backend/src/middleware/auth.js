//Middleware Authentication

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract the token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user this token belongs to and attach them to the request
      req.user = await User.findById(decoded.id).select("-hashed_password");

      // Move on to the actual route handler
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = protect;