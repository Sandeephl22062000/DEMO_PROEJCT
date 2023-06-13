const axios = require("axios");
const catchAsync = require("../../utils/catchAync");
const Food = require("../../Model/CalorieCountingModel");
const AppError = "../../Error-Handling";
const saveUserDetails = async (req, res, next) => {
  const { weight, height, gender, age, activity } = req.body;
  const userInfo = await Food.create({
    weight,
    height,
    gender,
    age,
    activity,
  });
  console.log(req.body);
  console.log(
    typeof weight,
    typeof height,
    typeof +gender,
    typeof age,
    typeof activity
  );
  if (gender.toLowerCase() === "male") {
    bmr = 88.362 + 13.397 * +weight + 4.799 * +height - 5.677 * +age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  console.log("bmr", bmr);
  if (activity.toLowerCase() === "sedentary") {
    activtyFactor = 1.2;
  } else if (activity.toLowerCase() === "light") {
    activtyFactor = 1.375;
  } else if (activity.toLowerCase() === "moderate") {
    activtyFactor = 1.55;
  } else if (activity.toLowerCase() === "veryactive") {
    activtyFactor = 1.725;
  } else if (activity.toLowerCase() === "light") {
    activtyFactor = 1.9;
  }
  console.log(activity, typeof activity);
  const maintenanceCalories = bmr * activtyFactor;
  const maintainceCalory = +maintenanceCalories.toFixed(2) 
  console.log(maintenanceCalories.toFixed(2), typeof +maintenanceCalories.toFixed(2));
  if (maintainceCalory) {
    res.status(201).json({
      data: maintainceCalory,
    });
  }
};
const calorieCounting = (req, res, next) => {
  const { weight, height, age, gender, activityFactors } = req.body;
  console.log(req.body);
  let bmr;

  if (gender.toLowerCase() === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  //   const activityFactors = {
  //     sedentary: 1.2,
  //     lightlyActive: 1.375,
  //     moderatelyActive: 1.55,
  //     veryActive: 1.725,
  //     extraActive: 1.9,
  //   };

  // Choose the appropriate activity factor based on your activity level
  //   const activityFactor = activityFactors;
  //https://preview.colorlib.com/#zacson
  const maintenanceCalories = bmr * activityFactors;
  //dynamically from forntend

  if (maintenanceCalories) {
    res.json({
      message: "Success",
      data: maintenanceCalories,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const CaloriesPerFood = catchAsync(async (req, res, next) => {
  // Function to fetch nutritional information for a given food
  console.log(req.params.food);

  const response = await axios.get(
    "https://api.api-ninjas.com/v1/nutrition?query=" + req.params.food,
    {
      headers: {
        "X-Api-Key": "GfUSyr5CqEOlf5KAfwxC7A==my5GQmnsj0pUQKgU",
      },
    }
  );
  console.log(response.data[0].calories);
  if (response.data[0].calories) {
    res.json({
      message: "Success",
      data: response.data,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

// Call the function and pass the food name as an argument

module.exports = { calorieCounting, CaloriesPerFood, saveUserDetails };

// For men:
// BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)

// For women:
// BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
