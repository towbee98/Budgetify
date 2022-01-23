const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 4400;
const app = require("./app");

//This handles uncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down app");
  process.exit(1);
});

const server = app.listen(PORT, async () => {
  await mongoose.connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("Connection has been established succesfully!");
  console.log(`App running at ${PORT}`);
});

//this handles the unhandled exceptions events in asynchronous codes
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down app");
  server.close(() => {
    process.exit(1);
  });
});
module.exports = server;
