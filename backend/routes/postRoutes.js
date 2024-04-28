const express = require("express");
const router = express.Router();
const {
  getPublicPosts,
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} = require("../controllers/postsController");
const { verifyJWT, ensureAdmin } = require("../middleware/authMiddleware");

// get all posts (protected by admin access)
// ADMIN ONLY

router.get("/", verifyJWT, ensureAdmin, getAllPosts);

// get public posts

router.get("/public", getPublicPosts);

// get single post

router.get("/:postId", getSinglePost);

// create post
// ADMIN ONLY

router.post("/", verifyJWT, ensureAdmin, createPost);

// update  post
// ADMIN ONLY

router.put("/:postId", verifyJWT, ensureAdmin, updatePost);

// delete post
// ADMIN ONLY

router.delete("/:postId", verifyJWT, ensureAdmin, deletePost);

// Like post

router.put("/:postId/like", verifyJWT, likePost);

// dislike post

router.put("/:postId/dislike", verifyJWT, dislikePost);

module.exports = router;
