const express = require("express");
const Trainer = require("../../Model/Trainer/trianerModel");
const User = require("../../Model/UserModel");
const AppError = require("../../Error-Handling/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RegisterTrainer = async (req, res, next) => {
  const { name, email, password, specialization, experiences, photo } =
    req.body;

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
    experiences,
    photo,
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

const loginTrainer = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return next(new AppError("Provide email and password both", 401));
  }

  const TrainerInfo = await Trainer.findOne({ email });
  if (!TrainerInfo) return next(new AppError("Please Register First", 401));

  const PasswordChecking = await bcrypt.compare(password, TrainerInfo.password);
  if (!PasswordChecking)
    return next(new AppError("Please provide Correct Password", 401));

  const token = jwt.sign({ id: TrainerInfo._id }, process.env.SECRET_KEY);
  console.log(token);
  if (TrainerInfo) {
    res.json({
      message: "Successfully login",
      data: TrainerInfo._id,
      token,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const getTrainerById = async (req, res) => {
  console.log(req.params.id);
  const trainer = await Trainer.findById({ _id: req.params.id });
  console.log(trainer);
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
    .populate({
      path: "likes",
      select: "userID",
    })
    .populate({
      path: "dislikes",
      select: "userID",
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
  loginTrainer,
};
