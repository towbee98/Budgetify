const fs = require("fs");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const Expense = require("./../models/expenses-model");
const { options } = require("./../models/expenses-model");

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.USER}`,
  `${process.env.PASSWORD}`,
  {
    host: `${process.env.HOST}`,
    dialect: `${process.env.dialect}`,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established succesfully!");
  })
  .catch((error) => {
    console.log(`Unable to connect to db,${error}`);
  });

//read the json file
const expense = JSON.parse(
  fs.readFileSync(`${__dirname}/budget-sample-data.json`, "utf-8")
);

//Import the data into the db
const importData = async () => {
  try {
    await Expense.bulkCreate(expense);
    console.log("Data successfully uploaded!!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all data from the db
const deleteData = async () => {
  try {
    await Expense.destroy({ truncate: true });
    console.log("Data successfully deleted!!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
//console.log(process.argv);
