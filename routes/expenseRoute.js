const express = require("express");

const expenseController = require(`./../controllers/expense-controller`);
const authController = require(`./../controllers/authController`);
const expenseRouter = express.Router({ mergeParams: true });
//budgetRouter.param("id", budgetController.checkId);
//expenseRouter.route("/").get(expenseController.getAllExpenses);
expenseRouter.use(authController.protect, authController.restrictUser("user"));
// expenseRouter
//   .route("/:budgetId")
//   .get(expenseController.getAnExpense)
//   .patch(expenseController.updateExpense)
//   .delete(expenseController.deleteExpense);
expenseRouter
  .route("/")
  .post(expenseController.createExpense)
  .get(expenseController.getAnExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);
module.exports = expenseRouter;
