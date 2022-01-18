const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./../models/user-model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appErrors");
const { promisify } = require("util");
const Email = require("./../utils/email");
//const { url } = require("inspector");

const tokenSign = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
  ),
  httpOnly: true,
};

const createSendToken = function (res, user, statusCode) {
  const token = tokenSign(user._id);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token: token,
    data: { user },
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  const url = `${req.protocol}://${req.get("host")}/SignIn`;
  await new Email(newUser, url).sendWelcome();
  // createSendToken(res, newUser, 201);
  //return response to the user
  res.status(201).json({
    status: "success",
    data: {
      message:
        "Account created successfully. You can now login with your details.",
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  //1)Check if username and password exist
  if (!username || !password) {
    return next(new AppError("Provide a username or password", 400));
  }
  //2)Check if user exists and password is correct
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Invalid Username Or Password", 401));
  }

  //3) If everything is ok ,send token to client
  createSendToken(res, user, 200);
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedOut", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
};

//This protects a particular route
exports.protect = catchAsync(async (req, res, next) => {
  //1.)Check if token comes with the request
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //console.log(req.headers.authorization);
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //console.log(token);
  if (!token) {
    return next(
      new AppError("You are not logged in ,Please login to gain access", 401)
    );
  }
  //2.) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);
  //3.)Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  //4.)Check if user changed password after the token was issued
  if (currentUser.changedPassword(decoded.iat)) {
    return next(
      new AppError("User recently changed password,Please Login again", 401)
    );
  }

  //Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

//Tracks if a user is logged in or not for rendered pages
exports.isLoggedin = async (req, res, next) => {
  if (req.cookies.jwt) {
    //1.) Verify the cookies
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    //console.log(decoded);

    //2.)Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }

    //3.)Check if user changed password after the token was issued
    if (currentUser.changedPassword(decoded.iat)) {
      return next();
    }
    //A loggedIn user exists
    res.locals.user = currentUser;
    return next();
  }
  next();
};

exports.restrictUser = (...roles) => {
  return (req, res, next) => {
    //console.log(req.user);
    //console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Restricted from performing this action", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1)Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("Email does not exist", 404));
  }
  //2)Generate the random reset token
  const resetToken = await user.createPasswordResetToken();
  //console.log("output" + user);
  await user.save({ validateBeforeSave: false });

  //   const message = `Forgot your password?Sumbit a PATCH request
  // with your new password and passwordConfirm to:
  //  ${resetUrl}.\nIf you didn't forget your password,
  //   please ignore this email`;

  try {
    //3)Send it to user's email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;
    await new Email(user, resetUrl).sendPasswordReset();
    res.status(200).json({
      status: "Success",
      message: "Token sent to email",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordTokenExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error occured while sending mails", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1.)Get user based on token
  const hashedtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedtoken,
    passwordTokenExpiresAt: {
      $gt: Date.now(),
    },
  });
  //2.)If the token has not expired ,and there is user,set the new password
  if (!user) {
    return next(new AppError("Invalid token or token has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordTokenExpiresAt = undefined;
  await user.save();
  //Log the user in and send JWT
  //createSendToken(res, user, 200);
  // const token = tokenSign(user._id);
  res.status(200).json({
    status: "Success",
    message: "Password successfully changed. You can now login.",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1.)Get user from db
  //console.log(req);
  const user = await User.findById(req.user.id).select("+password");
  // console.log(user);
  //2.)Check if the posted password is correct
  if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Sorry invalid password", 404));
  }
  //3.)If so Update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //4.)log user in,send JWT
  createSendToken(res, user, 200);
  // const token = tokenSign(user._id);
  // res.status(200).json({
  //   status: "success",
  //   data: { token },
  // });
});
