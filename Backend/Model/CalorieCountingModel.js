const mongoose = require("mongoose");
const CalorieSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    weight: {
      type: String,
      required: [true, "Provide Weight"],
    },
    height: {
      type: String,
      required: [true, "Provide height"],
    },
    gender: {
      type: String,
      required: [true, "Provide gender"],
    },
    age: {
      type: Number,
      required: [true, "Provide age"],
    },
    activity: {
      type: String,
      required: [true, "Provide actitvity"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
module.exports = mongoose.model("Food", CalorieSchema);
