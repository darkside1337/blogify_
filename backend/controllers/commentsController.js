const Comment = require("../models/CommentModel");
const Blogpost = require("../models/BlogpostModel");

/* 
postId
postedBy
postId
*/

const addComment = async (req, res) => {
  const { body, postId } = req.body;
  const { id: postedBy } = req.user;
  if (!body || !postId || !postedBy) {
    return res
      .status(400)
      .json({ error: "Failed to post comment, Invalid data!" });
  }

  try {
    const newComment = await Comment.create({
      body,
      postId,
      postedBy,
    });

    await newComment.populate("postedBy");

    // add comment to relevant post array

    await Blogpost.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    return res
      .status(201)
      .json({ message: "Comment Posted Successfully", comment: newComment });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Failed to post comment, try again later!" });
  }
};
const likeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { id: userId } = req.user;
  if (!userId || !commentId) {
    return res.status(400).json({ error: "Error liking comment" });
  }

  try {
    const likedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $addToSet: { likes: userId },
        $inc: { likeCount: 1 },
      },
      { new: true }
    );

    if (!likedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res
      .status(200)
      .json({ message: "Comment liked successfully", likedComment });
  } catch (error) {
    console.error("Error liking comment:", error);
    return res.status(500).json({ error: "Error liking comment" });
  }
};
const dislikeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const { id: userId } = req.user;

  if (!userId || !commentId) {
    return res.status(400).json({ error: "Error liking comment" });
  }

  try {
    const dislikedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { likes: userId },
        $inc: { likeCount: -1 },
      },
      { new: true }
    );

    if (!dislikedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res
      .status(200)
      .json({ message: "Comment liked successfully", dislikedComment });
  } catch (error) {
    console.error("Error liking comment:", error);
    return res.status(500).json({ error: "Error liking comment" });
  }
};

const deleteComment = async (req, res) => {
  const { id: userId, isAdmin } = req.user;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);

    // comment not found

    if (!comment) {
      return res.status(404).json({ error: "Comment not found!" });
    }

    // Check if the user is an admin or the one who posted the comment

    if (isAdmin || comment.postedBy.toString() === userId) {
      await Comment.findByIdAndDelete(commentId);
      return res.status(200).json({ message: "Comment successfully deleted!" });
    } else {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment!" });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this comment!" });
  }
};

module.exports = {
  addComment,
  deleteComment,
  likeComment,
  dislikeComment,
};
