const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is up and running!" });
});

// Routes (we'll plug these in on Day 2)
// app.use("/api", require("./routes"));

module.exports = app;