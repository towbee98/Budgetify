const User = require("./../models/user-model");
const catchAsync = require("./../utils/catchAsync");
const express = require("express");
const AppError = require("./../utils/appErrors");
const factory = require("./factoryHandler");
const receiveEmail = require("./../utils/receiveEmail");
//function to extract the required fields for querying the db
const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    size: users.length,
    data: users,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  if (req.user) req.params.id = req.user.id;
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1.)Return error if the req.body contains password

  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        "Sorry password update is not allowed here,visit api/users/updatePassword to update password",
        400
      )
    );
  }
  //2.)Filter out unwanted fields name that are not allowed to be updated on the db
  const filteredBody = filterObj(req.body, "firstName", "lastName", "email");
  //3.)Update User documents
  //console.log(filteredBody);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser)
    next(
      new AppError("An error occured while trying to update your data", 400)
    );
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true, runValidators: true }
  );
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getAuser = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    const user = await User.findById(req.params.id);
  }
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.deleteUser = factory.deleteOne(User);
//  (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "The routes is not yet defined",
//   });
// };
exports.contactUs = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const params = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    Phone: req.body.Phone,
    message: req.body.message,
  };

  await new receiveEmail(params).sendContactMsg();
  res.status(200).json({
    status: "Success",
    message: "data delivered",
  });
});
