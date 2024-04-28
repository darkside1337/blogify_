const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
