const express = require("express");
//const app = express();
const budgetController = require(`./../controllers/budget-Controllers`);
const authController = require("./../controllers/authController");
//const expenseController = require("./../controllers/expense-controller");
const budgetRouter = express.Router();
const expenseRouter = require("./../routes/expenseRoute");
//budgetRouter.param("id", budgetController.checkId);
budgetRouter.use(authController.protect);

budgetRouter.use("/:budgetId/expenditures", expenseRouter);

budgetRouter
  .route("/")
  .get(budgetController.getAbudget)
  //.get(authController.restrictUser("admin"), budgetController.getAllBudgets)
  .post(authController.restrictUser("user"), budgetController.createBudget);

budgetRouter
  .route("/:id")
  // .get(budgetController.getAbudget)
  .patch(budgetController.updateBudget)
  .delete(authController.restrictUser("user"), budgetController.deleteBudget);

module.exports = budgetRouter;
