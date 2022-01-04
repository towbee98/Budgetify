import axios from "axios";
import { showUpdateAlert, showAlert } from "./alerts";

export const createBudget = (budget) => {
  axios({
    method: "POST",
    url: `/api/budgets`,
    data: { budget },
  })
    .then((res) => {
      if (res.data.status === "Success") {
        showAlert("success", "Budget created successfully!!", "Create-Budget");
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
  axios({
    method: "POST",
    url: `/api/budgets/${data.budgetId}/expenditures`,
    data: filteredData,
  })
    .then((res) => {
      //console.log(res);
      if (res.data.status === "Success") {
        showAlert(
          "success",
          "Expense Created successfully!!,",
          "add-expenditure"
        );
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
    url: `/api/budgets/${data.budgetId}/expenditures`,
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
    url: `/api/budgets/${data.budgetId}/expenditures`,
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
    url: `/api/budgets/${budgetId}`,
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

export const submitContactMsg = (
  firstName,
  lastname,
  email,
  phone,
  message
) => {
  const params = {
    firstname: firstName,
    lastname,
    email,
    Phone: phone,
    message,
  };
  const url = `/api/users/contact`;
  axios({
    method: "POST",
    url,
    data: params,
  })
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        showAlert("success", "Message Sent successfully!!", "submitMsg");
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        showAlert("error", err.response.data.message, "submitMsg");
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
      //setTimeout(window.location.reload(true), 500);
    });
};
