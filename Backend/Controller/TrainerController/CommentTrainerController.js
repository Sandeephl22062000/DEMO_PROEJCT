const catchAsync = require("../../utils/catchAync");
const AppError = require("../../Error-Handling/error");
const Comment = require("../../Model/Trainer/CommentTrainer");
const Trainer = require("../../Model/Trainer/trianerModel");

const comment = catchAsync(async (req, res, next) => {
  const id = req.params.trainerID;
  const trainer = await Trainer.findById(id);

  if (!trainer) {
    return next(new AppError("Trainer does not exists", 403));
  }

  const addComment = await Comment.create({
    userID: req.user.id,
    trainerID: trainer.id,
    comment: req.body.comment,
  });

  // trainer.comments.push(addComment._id);
  // await trainer.save();

  const showComment = await Comment.findOne({
    userID: req.user.id,
    trainerID: trainer.id,
    comment: req.body.comment,
  })
    .populate({ path: "trainerID", select: "name" })
    .populate({ path: "userID", select: "name" });

  if (showComment) {
    res.json({
      message: "Comment Added Successfully",
      data: showComment,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = { comment };
