const express = require("express");
const {
  newPost,
  likeUnlikePost,
  deletePost,
  newComment,
  allPosts,
  getPostsOfFollowing,
  updateCaption,
  saveUnsavePost,
  getPostDetails,
} = require("../Controller/Post/PostController");
const AuthController = require("../Controller/AuthController");
const CommentController = require("../Controller/Post/CommentPost");
const PostController = require("../Controller/Post/PostController.js");
const { protectingRoutes } = require("../Controller/AuthController");

const router = express();

router
  .route("/commentpost/:postID")
  .post(AuthController.protectingRoutes, PostController.newComment);

  router
  .route("/likepost/:postID")
  .post(AuthController.protectingRoutes, PostController.newLike);

router.route("/new").post(protectingRoutes, newPost);

router.route("/posts/all").get(allPosts);

router.route("/posts").get(protectingRoutes, getPostsOfFollowing);

router.route("/post/detail/:id").get(protectingRoutes, getPostDetails);

// router
//   .route("/likepost/:postID")
//   .post(AuthController.protectingRoutes, LikePostController.likePost);

// router.route("/getUsersLike/:userID").get(LikePostController.getUsersLike);

// router
//   .route("/dislikeTrainer/:userID")
//   .post(AuthController.protectingRoutes, LikePostController.disLikedTrainer);

router
  .route("/commentTrainer/:userID")
  .post(AuthController.protectingRoutes, CommentController.comment);

router
  .route("/post/:id")
  .get(protectingRoutes, likeUnlikePost)
  .post(protectingRoutes, saveUnsavePost)
  .put(protectingRoutes, updateCaption)
  .delete(protectingRoutes, deletePost);

router.route("/post/comment/:id").post(protectingRoutes, newComment);

module.exports = router;
