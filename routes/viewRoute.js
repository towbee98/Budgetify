const express = require("express");
const viewRouter = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const budgetController = require("./../controllers/budget-Controllers");

viewRouter.route("/").get(viewController.homePage);
viewRouter.route("/SignUp").get(viewController.signUp);
viewRouter.route("/SignIn").get(viewController.signIn);
viewRouter.route("/AboutUs").get(viewController.aboutUs);
viewRouter.route("/ContactUs").get(viewController.ContactPage);
viewRouter.route("/forgetPassword").get(viewController.forgetPassword);
viewRouter.route("/resetPassword/:token").get(viewController.resetPassword);

viewRouter.use(authController.protect);
viewRouter.route("/userProfile").get(viewController.userProfile);
viewRouter
  .route("/budgetProfile")
  .get(budgetController.getAbudget, viewController.budgetProfile);

module.exports = viewRouter;
