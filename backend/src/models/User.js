const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: [true, "Password is required"],
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Before saving a user, hash their password if it was changed
userSchema.pre("save", async function () {
  if (!this.isModified("hashed_password")) return;
  this.hashed_password = await bcrypt.hash(this.hashed_password, 10);
});

// Method to check if an entered password matches the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.hashed_password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;