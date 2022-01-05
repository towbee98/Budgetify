const AppError = require("./../utils/appErrors");

const SendErrorDev = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) rendered  error page
  else {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }
};

const SendErrorProd = (err, req, res) => {
  //A)For API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      //Operational Error :Send message to  the client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      //Programming Error:Don't leak errors to the client
    }
    //1)Log Error
    console.log(err);
    //2)Send a generic message
    return res.status(500).json({
      status: "fail",
      message: err.message, //"Something went wrong!",
    });
  }

  //B) For Rendered Websites
  //Operational Error :Send message to  the client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Error Occured",
      msg: err.message,
    });
    //Programming Error:Don't leak errors to the client
  }
  //1)Log Error
  console.log(err);
  //2)Send a generic message
  return res.status(err.statusCode).render("error", {
    title: "Error occured",
    msg: "Please try again later",
  });
};

//This handles Invalid values Entered for a particular field queried from the db
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
//This handles duplicate errors
const handleDuplicateError = (err) => {
  const value = err.errmsg.match(/{(.*?)}/)[1];
  const message = `Duplicate value : ${value} already exists. Please use something else!`;
  return new AppError(message, 400);
};
//This handles validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data, ${errors.join(". ")}`;
  return new AppError(message, 400);
};
//This handles JsonWebToken Error
const handleJWTError = () => {
  return new AppError("Invalid token,Please login again", 401);
};
//This handles TokenExpired error
const handleJWTExpiredError = () => {
  return new AppError("Token Expired,Please login again", 401);
};

module.exports = (err, req, res, next) => {
  //console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = handleCastError(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateError(err);
    }
    if (err.name === "ValidationError") {
      err = handleValidationError(err);
    }
    if (err.name === "JsonWebTokenError") {
      err = handleJWTError();
    }
    if (err.name === "TokenExpiredError") {
      err = handleJWTExpiredError();
    }
    SendErrorProd(err, req, res);
  } else if (process.env.NODE_ENV === "development") {
    SendErrorDev(err, req, res);
  }
  //next();
};
