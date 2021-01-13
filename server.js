//const { Sequelize, Op } = require("sequelize");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//This handles uncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Shutting down app");
  process.exit(1);
});
mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //console.log(con.connections);
    console.log("Connection has been established succesfully!");
  });
// .catch((error) => {
//   console.log(`Unable to connect to db,${error}`);
// });

const app = require("./app");
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
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
//console.log(x);
