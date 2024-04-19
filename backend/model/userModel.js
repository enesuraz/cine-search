const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    api_key: String,
    usage: [
      {
        date: String,
        count: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
