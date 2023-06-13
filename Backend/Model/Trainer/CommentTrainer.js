const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    trainerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Comment", commentSchema);
