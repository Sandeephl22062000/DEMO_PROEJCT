const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
const DietController = require("../Controller/CalorieController.js/DietController");
const CalorieTrackerController = require("../Controller/CalorieTrackerController");
const { protectingRoutes } = require("../Controller/AuthController");
router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
router.route("/").get(UserController.getAllUser);
router.route("/:id").get(UserController.getUserById);
router.route("/updatePassword").post(UserController.updatePassword);
router
  .route("/updatedetails/:id")
  .patch(protectingRoutes, UserController.updateuserDetail);

router
  .route("/caloriecalculator")
  .post(protectingRoutes, DietController.calorieCounting);

router.post("/updateCalories", protectingRoutes, DietController.updatecalories);
router.post(
  "/saveTrackedCalories",
  CalorieTrackerController.saveTrackedCalories
);

router
  .route("/getMaintainceCalory")
  .post(protectingRoutes, DietController.getMaintainceCalory);
router.route("/caloriecalculator/:food").get(DietController.CaloriesPerFood);

router
  .route("/caloriecalculator/savedetail")
  .post(protectingRoutes, DietController.saveUserDetails);

module.exports = router;
