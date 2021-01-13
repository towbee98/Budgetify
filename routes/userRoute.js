const express = require("express");
//const app = express();
const userController = require("./../controllers/user-Controllers");
const authController = require("./../controllers/authController");
const userRouter = express.Router();
//app.use("/api/users", userRouter);

userRouter.route("/signUp").post(authController.signUp);
userRouter.route("/login").post(authController.login);
userRouter.route("/logOut").get(authController.logOut);

userRouter.route("/forgotPassword").post(authController.forgotPassword);
userRouter.route("/resetPassword/:token").patch(authController.resetPassword);

userRouter.use(authController.protect);
userRouter.route("/updatePassword").patch(authController.updatePassword);

userRouter.route("/me").get(userController.getMe);
userRouter.route("/updateMe").patch(userController.updateMe);
userRouter.route("/deleteMe").delete(userController.deleteMe);

userRouter.use(authController.restrictUser("admin"));
userRouter.route("/").get(userController.getAllUsers);

userRouter
  .route("/:id")
  .get(userController.getAuser)
  .delete(userController.deleteUser);

module.exports = userRouter;
