const Blogpost = require("../models/BlogpostModel");
const getPublicPosts = async (req, res) => {
  try {
    const posts = await Blogpost.find({ isPublic: true }).populate([
      {
        path: "postedBy",
        select: "-password",
      },
      {
        path: "likes",
        select: "-password",
      },
      {
        path: "comments",
        select: "-password",
        populate: {
          path: "postedBy",
          select: "-password",
        },
      },
    ]);
    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Having some problems getting the posts, please try again later!",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Blogpost.find({}).populate([
      {
        path: "postedBy",
        select: "-password",
      },
      {
        path: "likes",
        select: "-password",
      },
      {
        path: "comments",
        select: "-password",
        populate: {
          path: "postedBy",
          select: "-password",
        },
      },
    ]);

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Having some problems getting the posts, please try again later!",
    });
  }
};

const getSinglePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Blogpost.findById(postId).populate([
      {
        path: "postedBy",
        select: "-password",
      },
      {
        path: "likes",
        select: "-password",
      },
      {
        path: "comments",
        select: "-password",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "postedBy",
          select: "-password",
        },
      },
    ]);

    if (!post) {
      return res.status(400).json({ error: "Post does not exist" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      error: "Having some problems getting the post, please try again later!",
    });
  }
};

const createPost = async (req, res) => {
  const { title, body, isPublic, postPreview } = req.body;
  const { id: postedBy } = req.user;
  if (!title || !body || !postPreview || typeof isPublic !== "boolean") {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPost = await Blogpost.create({
      title,
      body,
      isPublic,
      postPreview,
      postedBy,
    });

    if (newPost) {
      return res.status(201).json({ message: "Post created successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed to create post!" });
  }
};

const updatePost = async (req, res) => {
  const data = req.body;

  const postId = req.params.postId;
  const { id: postedBy } = req.user;
  const payload = { ...data, postedBy };
  try {
    const updatedPost = await Blogpost.findByIdAndUpdate(postId, payload);
    if (updatedPost) {
      console.log("success");
      return res.status(200).json({ message: "Post updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed to update post!" });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    await Blogpost.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error deleting post, try again later!" });
  }
};

// TODO | LIKE POST | UNLIKE POST CONTROLLERS

const likePost = async (req, res) => {
  const postId = req.params.postId;
  const { id: userId } = req.user;

  if (!userId || !postId) {
    return res.status(400).json({ error: "Error liking post" });
  }

  try {
    const likedPost = await Blogpost.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: userId },
        $inc: { likeCount: 1 },
      },
      { new: true }
    );
    if (!likedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Liked post successfully", likedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error liking post" });
  }
};

const dislikePost = async (req, res) => {
  const postId = req.params.postId;
  const { id: userId } = req.user;

  if (!userId || !postId) {
    return res.status(400).json({ error: "Error disliking post" });
  }

  try {
    const dislikedPost = await Blogpost.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: userId },
        $inc: { likeCount: -1 },
      },
      { new: true }
    );

    if (!dislikedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Disliked post successfully", dislikedPost });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error disliking post" });
  }
};

module.exports = {
  getPublicPosts,
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
};
