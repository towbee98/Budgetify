const Budget = require("./../models/Budget-model");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appErrors");
const factory = require("./factoryHandler");
exports.getAllBudgets = catchAsync(async (req, res, next) => {
  const budgets = await Budget.find();
  res
    .status(200)
    .json({ status: "Success", results: budgets.length, data: { budgets } });
});

exports.getAbudget = catchAsync(async (req, res, next) => {
  //console.log(req.user);
  //console.log(req.originalUrl);
  const budget = await Budget.findOne({
    // id: req.params.id,
    user: req.user._id,
  });
  // const budget = await Budget.findOne({
  //   id: req.params.id,
  //   username: req.user.username,
  // });
  //this is the same as Budget.findOne({id:req.params.id})
  if (!budget) {
    const err = next(new appError(`You have not created any budget yet`, 404));
    return err;
  }
  res.locals.budget = budget;
  if (req.originalUrl.startsWith("/api")) {
    res.status(200).json({ status: "Success", result: 1, data: budget });
  } else next();
});

exports.createBudget = catchAsync(async (req, res, next) => {
  const budget = new Budget({
    user: req.user._id,
    budget: req.body.budget,
  });
  //console.log(budget);
  const query = await budget.save();

  res.status(201).json({
    status: "Success",
    data: query,
  });
});

//this updates the budget
exports.updateBudget = catchAsync(async (req, res, next) => {
  // const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  //console.log(req.user);
  const budget = await Budget.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!budget) {
    const err = next(new appError(`No Budget found with that ID`, 404));
    return err;
  }
  res.status(200).json({
    status: "success",
    data: budget,
  });
});

//this deletes a budget from the db
exports.deleteBudget = catchAsync(async (req, res, next) => {
  //const deleteBudget = await Budget.findByIdAndDelete(req.params.id);
  const deleteBudget = await Budget.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!deleteBudget) {
    const err = next(new appError(`No Budget found with that ID`, 404));
    return err;
  }
  res.status(204).json({
    status: "success",
    data: deleteBudget,
  });
});
// factory.deleteOne(Budget);
