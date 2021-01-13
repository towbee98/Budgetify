const express = require("express");
const viewRouter = express.Router();
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");
const budgetController = require("./../controllers/budget-Controllers");
viewRouter.route("/").get(viewController.homePage);
viewRouter.route("/SignUp").get(viewController.signUp);
viewRouter.route("/SignIn").get(viewController.signIn);
//viewRouter.use(authController.isLoggedin);
viewRouter
  .route("/userProfile")
  .get(authController.protect, viewController.userProfile);
viewRouter
  .route("/budgetProfile")
  .get(
    authController.protect,
    budgetController.getAbudget,
    viewController.budgetProfile
  );
viewRouter.get("/AboutUs", viewController.aboutUs);
viewRouter.get("/ContactUs", viewController.ContactPage);

module.exports = viewRouter;
