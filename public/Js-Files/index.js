import "@babel/polyfill";
import { login, logOut } from "./login-page";
import { signUp } from "./Sign-Up-Page";
import { updateData, updatePasswordData } from "./updateSettings";
import {
  createBudget,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteBudget,
  submitContactMsg,
} from "./DataUpload";
import Chart from "chart.js";

//DOM Elements
const toggleBtn = document.querySelector(".toggle-btn");
const toggleBar1 = document.querySelector(".toggle-bar-1");
const toggleBar2 = document.querySelector(".toggle-bar-2");
const toggleBar3 = document.querySelector(".toggle-bar-3");
const mainNav = document.querySelector(".main-nav");

//Create Budget buttons
const create_Budget_Btn = document.querySelector(".Create-Budget");
const view_Budget_Btn = document.querySelector(".View-Budget");
const cancel_Btn = document.querySelector("#cancel");
const save_Btn = document.querySelector("#save");
const delete_Budget_CTA = document.querySelector(".delete-budget");
const delete_Budget_Btn = document.querySelector("#delete-budget");

const backdrop = document.querySelector(".backdrop");
const new_Budget_form = document.querySelector(".new-budget-container");
const cancel_toggle_bar = document.querySelector(".cancel-btn");

//Expense icons
const editExpenseIcons = document.querySelectorAll(".edit-expense");
const deleteEXpenseIcons = document.querySelectorAll(".delete-expense");
const editExpenseContainer = document.querySelector(".edit-budget-container");
const deleteExpenseContainer = document.querySelector(
  ".delete-expense-container"
);
const deleteBudgetContainer = document.querySelector(
  ".delete-budget-container"
);
const cancelExpenseBtns = document.querySelectorAll(".expense-Cancel");
const expenseTitle = document.querySelector("#expense-title");
const allocatedExpense = document.querySelector("#expense-Allocated");
const expenseSpent = document.querySelector("#expense-Spent");

const percentValue = document.querySelector(".percent-value");
let progressBars = document.querySelectorAll("#myBar");

const update_Expense_Btn = document.querySelector("#expense-Save");
const delete_Expense_Btn = document.querySelector("#expense-delete");
const budget = document.querySelector(".total-allocation");

const add_new_expenditure_btn = document.querySelector(
  ".add-expenditure button"
);
const newExpenditureContainer = document.querySelector(
  ".add-new-expenditure-container form"
);
const new_expenditure_title = document.querySelector("#item");
const new_allocated_expenditure = document.querySelector("#Amount");
const save_new_expenditure = document.querySelector(".add-new-expenditure");
const ctx = document.getElementById("pieChart");
const allocation_Of_All_Expenses = document.querySelectorAll(".item-budget i");
//const title_Of_All_Expenses = document.querySelectorAll(".item-name");

//Declare all the variables
const allocated_expenses_Array = [];
const expense_title_Array = [];
const bgcolorArray = [];
const borderColorArray = [];
let expenseID, budgetId;

//Generate a random color
const generateMycolor = (opacity) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 240)},${opacity})`;
  return randomColor;
};

//Collection of data to be used in the chart
if (allocation_Of_All_Expenses) {
  allocation_Of_All_Expenses.forEach((el) => {
    let currentExpenseTitle =
      el.parentElement.parentElement.previousSibling.firstChild.firstChild
        .textContent;
    allocated_expenses_Array.push(Number(el.textContent));
    bgcolorArray.push(generateMycolor(0.2));
    borderColorArray.push(generateMycolor(1));
    expense_title_Array.push(currentExpenseTitle);
  });
}

//The Chart Illustration Setup
if (ctx) {
  const myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: expense_title_Array,
      datasets: [
        {
          data: allocated_expenses_Array,
          backgroundColor: bgcolorArray,
          borderColor: borderColorArray,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "The Expenses Chart",
      },
      legend: {
        display: true,
        labels: {
          fontColor: "rgb(255,99,132)",
          fontSize: 10,
        },
      },
    },
  });
}

if (budget) {
  budgetId = budget.getAttribute("data-id");
}
//const budgetId = budget.getAttribute("data-id");
if (delete_Budget_CTA) {
  delete_Budget_CTA.addEventListener("click", () => {
    deleteBudgetContainer.style.display = "block";
    backdrop.style.display = "block";
  });
}
if (delete_Budget_Btn) {
  delete_Budget_Btn.addEventListener("click", async () => {
    event.preventDefault();
    await deleteBudget(budgetId);
    deleteBudgetContainer.style.display = "none";
  });
}
if (add_new_expenditure_btn) {
  add_new_expenditure_btn.addEventListener("click", () => {
    newExpenditureContainer.style.display = "block";
    add_new_expenditure_btn.style.display = "none";
  });
}

if (save_new_expenditure) {
  save_new_expenditure.addEventListener("click", async () => {
    event.preventDefault();
    const data = {
      budgetId,
      title: new_expenditure_title.value,
      allocated: new_allocated_expenditure.value,
    };
    await createExpense(data);
    add_new_expenditure_btn.style.display = "inline";
    newExpenditureContainer.style.display = "none";
  });
}

if (editExpenseIcons) {
  editExpenseIcons.forEach((el) =>
    el.addEventListener("click", () => {
      editExpenseContainer.style.display = "block";
      backdrop.style.display = "block";
      expenseID = el.parentElement.getAttribute("data-id");

      expenseTitle.value = el.previousSibling.textContent;
      allocatedExpense.value =
        el.parentElement.parentElement.nextSibling.firstChild.lastChild.textContent;
      expenseSpent.value =
        el.parentElement.parentElement.nextSibling.lastChild.lastChild.textContent;
    })
  );
}

if (deleteEXpenseIcons) {
  deleteEXpenseIcons.forEach((el) => {
    el.addEventListener("click", () => {
      deleteExpenseContainer.style.display = "block";
      backdrop.style.display = "block";
      expenseID = el.parentElement.getAttribute("data-id");
    });
  });
}
if (cancelExpenseBtns) {
  cancelExpenseBtns.forEach((el) => {
    el.addEventListener("click", () => {
      editExpenseContainer.style.display = "none";
      backdrop.style.display = "none";
      deleteExpenseContainer.style.display = "none";
      deleteBudgetContainer.style.display = "none";
    });
  });
}

if (progressBars) {
  progressBars.forEach((el) => {
    el.style.width = el.parentElement.nextSibling.textContent;
  });
}
if (delete_Expense_Btn) {
  delete_Expense_Btn.addEventListener("click", async () => {
    event.preventDefault();
    const data = {
      budgetId: budgetId,
      _id: expenseID,
    };
    await deleteExpense(data);
  });
}
if (update_Expense_Btn) {
  update_Expense_Btn.addEventListener("click", async () => {
    event.preventDefault();
    const data = {
      budgetId: budgetId,
      title: expenseTitle.value,
      allocated: allocatedExpense.value,
      spent: expenseSpent.value,
      _id: expenseID,
    };
    await updateExpense(data);
  });
}

if (create_Budget_Btn) {
  create_Budget_Btn.addEventListener("click", () => {
    new_Budget_form.style.display = "block";
    backdrop.style.display = "block";
  });
  cancel_toggle_bar.addEventListener("click", () => {
    new_Budget_form.style.display = "none";
    backdrop.style.display = "none";
  });
  document.querySelector(".save-budget").addEventListener("click", async () => {
    event.preventDefault();
    const budget = document.querySelector("#Gross-Budget").value;
    await createBudget(budget);
    new_Budget_form.style.display = "none";
    backdrop.style.display = "none";
  });
}

//This is for the Contact Us Page
if (document.querySelector(".Contact-Us")) {
  const submitBtn = document.forms[0][5];
  submitBtn.addEventListener("click", async () => {
    e.preventDefault();
    let firstName = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value;
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone-number").value;
    let message = document.querySelector("#message").value;
    await submitContactMsg(firstName, lastname, email, phone, message);
    firstName = "";
    lastname = "";
    email = "";
    phone = "";
    message = "";
  });
}

//This is the sign up page
if (document.forms.signUp) {
  const signUpBtn = document.forms.signUp[6];
  console.log(signUpBtn);
  // const signUpMessage = document.querySelector(".sign-up-message");
  // const loginLink = document.querySelector(".login-link");
  // const loader = document.querySelector(".loader");
  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let firstName = document.forms.signUp.elements.firstname.value;
    let lastName = document.forms.signUp.elements.lastname.value;
    let username = document.forms.signUp.elements.username.value;
    let email = document.forms.signUp.elements.email.value;
    let password = document.forms.signUp.elements.password.value;
    let passwordConfirm = document.forms.signUp.elements.passwordConfirm.value;

    const details = {
      firstName,
      lastName,
      username,
      email,
      password,
      passwordConfirm,
    };

    await signUp(details);
    firstName = "";
    lastName = "";
    username = "";
    email = "";
    password = "";
    passwordConfirm = "";
  });
}

//This is for the login page
if (document.forms.signIn) {
  const submitBtn = document.forms.signIn[2];
  //const rememberMeBtn = document.forms[0][3];
  const forgotPassword = document.forms[0][3];
  const loginMessage = document.querySelector(".login-message");
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let username = document.forms.signIn.elements.username.value;
    let password = document.forms.signIn.elements.password.value;
    const details = { username, password };
    //this controls what happens when the sign up button is clicked
    login(details);
    username = "";
    password = "";
  });
}

//This is for the user Profile Page
if (document.querySelector(".user-account")) {
  document.querySelector("#save").addEventListener("click", () => {
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const username = document.querySelector("#user-name").value;
    const email = document.querySelector("#e-mail").value;

    updateData(firstName, lastName, username, email);
  });
}

//This is for the user Profile Page where we update the password
if (document.querySelector(".user-password")) {
  //console.log(document.querySelector("#update"));
  document.querySelector("#update").addEventListener("click", async () => {
    event.preventDefault();
    const password = document.querySelector("#password").value;
    const currentPassword = document.querySelector("#currentPassword").value;
    const passwordConfirm = document.querySelector("#passwordConfirm").value;
    updatePasswordData(password, currentPassword, passwordConfirm);
  });
}
let click = 0;
toggleBtn.addEventListener("click", function () {
  if (click % 2 == 0) {
    mainNav.style.left = "0";
    toggleBar1.style.opacity = "0";
    toggleBar2.style.transform = "rotateZ(45deg) translateX(6px)";
    toggleBar3.style.transform =
      "rotateZ(-45deg) translateX(4px) translateY(2px)";
  } else {
    mainNav.style.left = "-300px";
    toggleBar1.style.opacity = "1";
    toggleBar2.style.transform = "rotateZ(0) translateX(0)";
    toggleBar3.style.transform = "rotateZ(0) translateX(0) translateY(0)";
  }
  click++;
});

mainNav.addEventListener("click", async function (e) {
  for (let i = 0; i < mainNav.children.length; i++) {
    if (e.target.textContent == mainNav.children[i].textContent) {
      if (e.target.textContent === "LogOut") {
        await logOut();
      }
      click++;
      mainNav.style.left = "-300px";
      toggleBar1.style.opacity = "1";
      toggleBar2.style.transform = "rotateZ(0) translateX(0)";
      toggleBar3.style.transform = "rotateZ(0) translateX(0) translateY(0)";
      break;
    }
  }
});
