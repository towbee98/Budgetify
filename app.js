const fs = require("fs");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const CookieParser = require("cookie-parser");

const AppError = require("./utils/appErrors");
const globalErrorhandler = require("./controllers/errorController");
const budgetRouter = require(`./routes/budgetRoute`);
const userRouter = require("./routes/userRoute");
const expenseRouter = require("./routes/expenseRoute");
const viewRouter = require("./routes/viewRoute");
const app = express();

//Setup our view engine
app.set("view engine", "pug");
//define the location of our templates
app.set("views", path.join(__dirname, "views"));

//1.)Global middleware

//Set security HTTP header
app.use(helmet());

//read static files
//app.use(express.static(`${__dirname}/public`)); is the same as below
app.use(express.static(path.join(__dirname, "public")));

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//limit the number of requests from the api
const limiter = rateLimiter({
  max: 50,
  windowMs: 0.5 * 60 * 1000,
  message: "To many requests from the same ip,Try again in the next 30 minutes",
});
app.use("/api", limiter);

//body parser,reading data from the body
app.use(express.json({ limit: "20kb" }));
app.use(CookieParser()); //cookie parser parses data from the cookie

//Data Sanitization against NO Sql injection
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());

//Compress all text and html cotents in responses
app.use(compression());
//Routes

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/budgets", budgetRouter);
app.use("/", viewRouter);

//this handles wrong url
app.all("*", (req, res, next) => {
  const err = new AppError(
    `Sorry can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(globalErrorhandler);
module.exports = app;
