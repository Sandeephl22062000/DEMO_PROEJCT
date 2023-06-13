const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
const DietController = require("../Controller/CalorieController.js/DietController");
const LikeTrainerController = require("../Controller/TrainerController/LikeTrainerController");
const AuthController = require("../Controller/AuthController");
const CommentController = require("../Controller/TrainerController/CommentTrainerController");

router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
router.route("/").get(UserController.getAllUser);
router.route("/updatePassword").post(UserController.updatePassword);

router.route("/caloriecalculator").post(DietController.calorieCounting);
router.route("/caloriecalculator/:food").get(DietController.CaloriesPerFood);

router
  .route("/caloriecalculator/savedetail")
  .post(DietController.saveUserDetails);

router
  .route("/likeTrainer/:trainerID")
  .post(AuthController.protectingRoutes, LikeTrainerController.likedTrainer);

router
  .route("/dislikeTrainer/:trainerID")
  .post(AuthController.protectingRoutes, LikeTrainerController.disLikedTrainer);

router
  .route("/commentTrainer/:trainerID")
  .post(AuthController.protectingRoutes, CommentController.comment);

router
  .route("/getUsersLike/:trainerID")
  .get(LikeTrainerController.getUsersLike);

module.exports = router;
