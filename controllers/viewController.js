const User = require("./../models/user-model");
const Budget = require("./../models/Budget-model");
const AppError = require("../utils/appErrors");


exports.homePage = (req, res) => {
  res
    .status(200)
    .header("Content-Security-Policy", "connect-src *")
    .render("index", {
      title: "Homepage",
    });
};

exports.signUp = (req, res) => {
  res
    .header(
      "Content-Security-Policy",
      " default-src 'self';style-src 'self';connect-src ws://localhost:56001/ *;script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"
    )
    .status(200)
    .render("SignUp", {
      title: "Sign Up",
    });
};

exports.signIn = (req, res) => {
  res
    .header(
      "Content-Security-Policy",
      " default-src 'self';style-src 'self';connect-src *;script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"
    )
    .status(200)
    .render("signIn", {
      title: "Sign In",
    });
};


exports.userProfile = (req, res) => {
  // const user = User.findOne({ _id: req.user.id });
  // if (!user)
  // return next(new AppError("Error!! User with that  ID does not exist", 404));

  res
    .status(200)
    .header(
      "Content-Security-Policy",
      "default-src 'self' ;style-src 'self';connect-src *;"
    )
    .render("userProfile", {
      title: "Account",
    });
};


exports.budgetProfile = (req, res) => {
  //console.log(res.locals);
  res
    .status(200)
    .header(
      "Content-Security-Policy",
      "default-src 'self' ;style-src 'self' 'unsafe-inline';connect-src ws://localhost:56357/ ws://localhost:49367/ *;"
    )
    .render("budgetProfile", {
      title: "Budget Profile",
    });
};


exports.aboutUs = (req, res) => {
  res
    .status(200)
    .header(
      "Content-Security-Policy",
      "default-src 'self' ;connect-src ws://localhost:51741/ *"
    )
    .render("About", {
      title: "About Us",
    });
};


exports.ContactPage = (req, res) => {
  res
    .status(200)
    .header(
      "Content-Security-Policy",
      "default-src  'self' ;connect-src ws://localhost:65068/ * "
    )
    .render("ContactPage", {
      title: "Get in Touch",
    });
};

