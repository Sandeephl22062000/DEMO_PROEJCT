const mongoose = require("mongoose");
const CalorieSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    weight: {
      type: Number,
      required: [true, "Provide Weight"],
    },
    height: {
      type: Number,
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
    user: {
      type: String,
    },
    maintainceCalory: { type: Number },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
module.exports = mongoose.model("Food", CalorieSchema);
