const mongoose = require("mongoose");
const DisLikeSchema = mongoose.Schema(
  {
    trainerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("DisLike", DisLikeSchema);
