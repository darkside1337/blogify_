const mongoose = require("mongoose");

const BlogpostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    body: {
      type: String,
      required: true,
      minLength: 3,
    },
    postPreview: {
      type: String,
      minLength: 3,
      maxLength: 500,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogpost", BlogpostSchema);
