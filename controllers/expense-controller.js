const Budget = require("./../models/Budget-model");
//const APIfeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appErrors");
const AppError = require("./../utils/appErrors");
//this gets all expenses of a particular user

// exports.getAllExpenses = async (req, res) => {
//   try {
//     //Build Query
//     console.log(req.body);
//     const queryObj = req.body;
//     const excludeFields = ["page", "sort", "limit"];
//     excludeFields.forEach((el) => {
//       delete queryObj[el];
//     });

//     /* const features = new APIfeatures(queryObj, req.query)
//       .sort()
//       .filter()
//       .order()
//       .userFilter()
//       .limitFields()
//       .paginate();
// */

//     //Execute Query
//     console.log(req.body);
//     const queryChecker = (data) => {
//       if (data != {}) {
//         const query = Budget.find(data);
//         return query.select("expenditures");
//       } else {
//         return;
//       }
//     };
//     const expense = await queryChecker(queryObj);

//     //Send Response
//     res.status(200).json({
//       status: "Success",
//       results: expense.length,
//       data: { expense },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

//this reads all the  expenditures of a particular user from the db
exports.getAnExpense = catchAsync(
  async (req, res, next) => {
    //console.log(req.query);
    const query = Budget.find({ _id: req.params.budgetId, user: req.user._id });
    if (!query) {
      const err = next(new appError(`No Budget found with that ID`, 404));
      return err;
    }
    const expense = await query.select("expenditures");
    res.locals.expense = expense;
    res
      .status(200)
      .json({ status: "Success", results: expense.length, data: expense });
  }

  // catch (err) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
);

//this creates a new expense for a particular user
exports.createExpense = catchAsync(async (req, res, next) => {
  //console.log(req.params.budgetId);
  const query = await Budget.findOne({
    _id: req.params.budgetId,
    user: req.user.id,
  });
  if (!query) {
    const err = next(new appError(`No Budget found with that ID`, 404));
    return err;
  }
  // query = await query.expenditures.forEach((el) => {
  //   if (el.title === req.body.title) {
  //     return next(new appError("Expense name already exist", 400));
  //   }
  // });
  query.expenditures.addToSet({
    title: req.body.title,
    allocated: req.body.allocated,
    spent: req.body.spent,
  });
  const result = await query.save();

  res.status(201).json({
    status: "Success",
    data: result,
  });
});

//this updates a particular expense
exports.updateExpense = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const query = await Budget.findOneAndUpdate(
    {
      _id: req.params.budgetId,
      user: req.user._id,
      "expenditures._id": req.body._id,
    },
    { $set: { "expenditures.$": req.body } },
    { new: true, runValidators: true }
  );
  // const query = await Budget.findById(req.params.id);
  if (!query) {
    const err = next(
      new appError(`Error finding Budget or Expenditure with that ID`, 404)
    );
    return err;
  }
  // const numberofExpenses = query.expenditures.length;
  // query.expenditures.forEach((el) => {
  //   if (el._id === req.body._id) {
  //     console.log(el);
  //     el.title = req.body.title;
  //     el.allocated = req.body.allocated;
  //     el.spent = req.body.spent;
  //     el.expense_id = numberofExpenses + 1;
  //   }
  // });
  const result = await query.save();

  res.status(200).json({
    status: "success",
    data: result,
  });
});

//this deletes an expense from the db
exports.deleteExpense = catchAsync(async (req, res, next) => {
  const expense = await Budget.findOneAndUpdate(
    { _id: req.params.budgetId, user: req.user.id },
    { $pull: { expenditures: req.body } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!expense)
    return next(
      new AppError(
        "Error occured while trying to delete the expense with that ID"
      )
    );
  await expense.save();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
