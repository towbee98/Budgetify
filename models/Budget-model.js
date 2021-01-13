const mongoose = require("mongoose");
//const Expense = require("./../models/expenses-model");
//const User = require("./user-model");
// const expenseTotal = function (doc) {
//   let x = 0;
//   if (doc.expenditures) {
//     doc.expenditures.forEach((el) => {
//       x += el.allocated;
//     });
//     doc.totalExpenses = x;
//   }
//   return doc;
// };
const expenditureSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [15, "Cannot exceed 15 charaters"],
    minlength: [1, "Must contain at least one character"],
  },
  allocated: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value <= this.allocated;
      },
      message: "Sorry money spent should be less than the allocated sum",
    },
  },
});
const budgetSchema = new mongoose.Schema({
  // budget_id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  // username: {
  //   type: String,
  //   required: [true, "Username cannot be empty"],
  //   unique: true,
  // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    required: [true, "Please enter a budget"],
  },
  totalExpenses: {
    type: Number,
    validate: {
      validator: function (value) {
        return value <= this.budget;
      },
      message: "Sorry The Total Expenses cannot exceed the available budget",
    },
  },
  expenditures: [expenditureSchema],
});
// budgetSchema.virtual("totalExpenses").set(function () {
//   return this.expenditures.reduce(function (currentValue, previousValue) {
//     return currentValue.allocated + previousValue.allocated;
//   });
// });

budgetSchema.pre("validate", function (next) {
  //console.log(this.expenditures);
  let sum = 0;
  if (this.expenditures) {
    this.expenditures.forEach((el) => {
      sum += el.allocated;
    });
    this.totalExpenses = sum;
  }
  //expenseTotal(this);

  next();
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
