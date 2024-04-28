const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      minLength: 3,
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Blogpost",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
