const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
  likeComment,
  dislikeComment,
} = require("../controllers/commentsController");
const { verifyJWT, ensureAdmin } = require("../middleware/authMiddleware");

/* add, like, dislike, delete */

// add comment

router.post("/", verifyJWT, addComment);

// like comment

router.put("/:commentId/like", verifyJWT, likeComment);

// dislikelike comment

router.put("/:commentId/dislike", verifyJWT, dislikeComment);

// delete comment

router.delete("/:commentId", verifyJWT, deleteComment);

module.exports = router;
