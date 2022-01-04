const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appErrors");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //const doc = await Budget.findByIdAndDelete(req.params.id);
    //console.log(req.params.id, req.user.id);
    const doc = await Model.findOneAndDelete({
      _id: req.params.id,
      // user: req.user.id,
    });
    if (!doc) {
      const err = next(new AppError(`No document found with that ID`, 404));
      return err;
    }
    res.status(204).json({
      status: "success",
      data: doc,
    });
  });
