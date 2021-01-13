import axios from "axios";
import { showUpdateAlert, showAlert } from "./alerts";

export const createBudget = (budget) => {
  axios({
    method: "POST",
    url: `http://localhost:4400/api/budgets`,
    data: { budget },
  })
    .then((res) => {
      if (res.data.status === "Success") {
        showAlert("success", "Budget created successfully!!");
      }
    })
    .catch((err) => {
      if (err.response) {
        showAlert(
          "error",
          "You have an existing budget,Delete it to create a new one "
        );
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    });
};
const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const createExpense = (data) => {
  const filteredData = filterObj(data, "title", "allocated");
 
    method: "POST",
    url: `http://localhost:4400/api/budgets/${data.budgetId}/expenditures`,
    data: filteredData,
  })
    .then((res) => {
      //console.log(res);
      if (res.data.status === "Success") {
        showUpdateAlert("success", "Expense Created successfully!!");
        setTimeout(window.location.reload(true), 500);
      }
    })
    .catch((err) => {
      if (err.response) {
        showUpdateAlert("error", err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      //setTimeout(window.location.reload(true), 500);
    });
};

export const updateExpense = (data) => {
  const filteredData = filterObj(data, "title", "spent", "allocated", "_id");
  
  axios({
    method: "PATCH",
    url: `http://localhost:4400/api/budgets/${data.budgetId}/expenditures`,
    data: filteredData,
  })
    .then((res) => {
      if (res.data.status === "success") {
        showUpdateAlert("success", "Expense updated successfully!!", "pop");
        setTimeout(window.location.reload(true), 500);
      }
    })
    .catch((err) => {
      if (err.response) {
        showUpdateAlert("error", err.response.data.message, "pop");
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      //setTimeout(window.location.reload(true), 500);
    });
};

export const deleteExpense = (data) => {
  const filteredData = filterObj(data, "_id");
  axios({
    method: "DELETE",
    url: `http://localhost:4400/api/budgets/${data.budgetId}/expenditures`,
    data: filteredData,
  })
    .then((res) => {
      if (res.status === 204) {
        showUpdateAlert("success", "Expense deleted successfully!!", "pop");
        setTimeout(window.location.reload(true), 500);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        showUpdateAlert("error", err.response.data.message, "pop");
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      //setTimeout(window.location.reload(true), 500);
    });
};

export const deleteBudget = (budgetId) => {
  axios({
    method: "DELETE",
    url: `http://localhost:4400/api/budgets/${budgetId}`,
  })
    .then((res) => {
     // console.log(res);
      if (res.status === 204) {
        showUpdateAlert("success", "Budget deleted successfully!!", "pop");
        setTimeout(window.location.replace("/userProfile"), 500);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        showUpdateAlert("error", err.response.data.message, "pop");
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      //setTimeout(window.location.reload(true), 500);
    });
};
