const CalorieTracker = require("../Model/TrackCalorie");

const saveTrackedCalories = async (req, res, next) => {
  const { name, calories, fat, carbs, protein, quantity } = req.body;
  try {
    const { items, sumCalorie, sumFat, sumCarbs, sumProtein, name } = req.body;

    // Create a new food instance
    const data = await CalorieTracker.create({
      name,
      items,
      sumCalorie,
      sumCarbs,
      sumProtein,
      sumFat,
    });

    res
      .status(200)
      .json({ data: data, message: "Food item saved successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { saveTrackedCalories };
