const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
const DietController = require("../Controller/CalorieController.js/DietController");



router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
router.route("/").get(UserController.getAllUser);
router.route("/:id").get(UserController.getUserById);
router.route("/updatePassword").post(UserController.updatePassword);

router.route("/caloriecalculator").post(DietController.calorieCounting);
router.route("/caloriecalculator/:food").get(DietController.CaloriesPerFood);

router
  .route("/caloriecalculator/savedetail")
  .post(DietController.saveUserDetails);



module.exports = router;
