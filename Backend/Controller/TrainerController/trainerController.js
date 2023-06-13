const express = require("express");
const Trainer = require("../../Model/Trainer/trianerModel");
const User = require("../../Model/UserModel");
const AppError = require("../../Error-Handling/error");
const RegisterTrainer = async (req, res, next) => {
  const { name, email, password, specialization, experiences } = req.body;

  const findEmailinUser = await User.findOne({ email });
  console.log(findEmailinUser);
  if (findEmailinUser)
    return next(new AppError("You are Already registered as User", 000));
  const findEmailinTrainer = await Trainer.findOne({ email });
  if (findEmailinTrainer)
    return next(new AppError("This Email is Already Registerd", 000));

  const trainerinfo = await Trainer.create({
    name,
    email,
    password,
    specialization,
    experiences
  });
  console.log(trainerinfo);
  if (trainerinfo) {
    res.json({
      message: "Successfully register",
      data: trainerinfo,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainerById = async (req, res) => {
  console.log(req.params.id);
  const trainer = await Trainer.findById({ _id: req.params.id });
  if (trainer) {
    res.json({
      message: "Successfully register",
      data: trainer,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};
const getAlltrainer = async (req, res, next) => {
  const keyword = req.params.trainer
    ? {
        $or: [
          { name: { $regex: req.params.trainer, $options: "i" } },
          { email: { $regex: req.params.trainer, $options: "i" } },
        ],
      }
    : {};

  const trainers = await Trainer.find(keyword)
    .populate({
      path: "comments",
      select: "userID, comment",
    })
    .lean();

  if (trainers) {
    res.json({
      message: "Successfully register",
      data: trainers,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainers = async (req, res, next) => {
  const trainers = await Trainer.find();

  if (trainers) {
    res.json({
      message: "Successfully register",
      data: trainers,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};
module.exports = {
  RegisterTrainer,
  getAlltrainer,
  getTrainers,
  getTrainerById,
};
