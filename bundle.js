require("@babel/polyfill");
var $rnClU$chartjs = require("chart.js");
var $rnClU$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $911e61cb2e54ea36$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $911e61cb2e54ea36$export$de026b00723010c1 = (type, msg, attribute)=>{
    $911e61cb2e54ea36$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    if (attribute) document.querySelector(`.${attribute}`).insertAdjacentHTML("afterend", markup);
    else document.querySelector("section").insertAdjacentHTML("beforeend", markup);
    window.setTimeout($911e61cb2e54ea36$export$516836c6a9dfc573, 5000);
};
const $911e61cb2e54ea36$export$84b671a5134b691 = (type, msg, pop)=>{
    $911e61cb2e54ea36$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    if (pop) {
        document.querySelector(".edit-budget-container").insertAdjacentHTML("beforeend", markup);
        return window.setTimeout($911e61cb2e54ea36$export$516836c6a9dfc573, 5000);
    }
    document.querySelector("section").insertAdjacentHTML("beforebegin", markup);
    window.setTimeout($911e61cb2e54ea36$export$516836c6a9dfc573, 5000);
};


const $7abda2fae5c78272$var$makeApiCall = async (url, method, params)=>{
    try {
        return await (0, ($parcel$interopDefault($rnClU$axios)))({
            method: method,
            url: url,
            data: params
        });
    } catch (error) {
        (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", error.response.data.message);
    //console.log(error.response.data);
    }
};
const $7abda2fae5c78272$export$596d806903d1f59e = async (details)=>{
    try {
        const url = `/api/users/login`;
        const method = "POST";
        // $.ajax({
        //   type: "POST",
        //   url: url,
        //   dataType: "json",
        //   beforeSend: function () {
        //     //this
        //     $(".loader").show();
        //   },
        //   complete: function () {
        //     $(".loader").hide();
        //   },
        // });
        const res = await $7abda2fae5c78272$var$makeApiCall(url, method, details);
        if (res.data.status === "Success") {
            (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", "Login Successful !!");
            window.setTimeout(window.location.replace("/userProfile"), 2000);
        }
    } catch (error) {
        console.log(error);
    }
};
const $7abda2fae5c78272$export$464881f0a7cf0212 = async ()=>{
    try {
        const method = "GET";
        const url = `/api/users/logOut`;
        const res = await $7abda2fae5c78272$var$makeApiCall(url, method);
        if (res.data.status === "success") window.setTimeout(window.location.assign("/"), 5000);
    } catch (error) {
        console.log(error);
        (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", error.response.data.message);
    }
};
const $7abda2fae5c78272$export$673d147991b6b950 = async (details)=>{
    try {
        const url = "/api/users/forgotPassword";
        const method = "POST";
        // $.ajax({
        //   type: method,
        //   url: url,
        //   dataType: "json",
        //   beforeSend: function () {
        //     //this
        //     $(".loader").show();
        //   },
        //   complete: function () {
        //     $(".loader").hide();
        //   },
        // });
        const res = await $7abda2fae5c78272$var$makeApiCall(url, method, details);
        if (res.data.status === "Success") (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", res.data.message);
    } catch (error) {
        console.log(error);
        (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", error.response.data.message);
    }
};
const $7abda2fae5c78272$export$99d837dc30eb1ef7 = async (details, token)=>{
    try {
        const url = `/api/users/resetPassword/${token}`;
        const method = "PATCH";
        const res = await $7abda2fae5c78272$var$makeApiCall(url, method, details);
        if (res.data.status === "Success") (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", res.data.message);
    } catch (error) {
        console.log(error);
        (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", error.response.data.message);
    }
};




const $c80e3ae494eaa506$var$makeApiCall = async (url, data)=>{
    try {
        const res = await (0, ($parcel$interopDefault($rnClU$axios)))({
            method: "post",
            url: url,
            data: data
        });
        if (res.data.status === "success") {
            (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", res.data.data.message);
            window.setTimeout(location.assign("/SignIn"), 5000);
        }
    } catch (err) {
        // console.log(err.response);
        // console.log(err.request);
        (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", err.response.data.message);
    //console.log(error.response.data);
    }
};
const $c80e3ae494eaa506$export$cf64224bcd829024 = async (details)=>{
    const url = `/api/users/signUp`;
    await $c80e3ae494eaa506$var$makeApiCall(url, details);
};




const $fc971ce67d2c187d$export$3bf0495508a61ee = (firstName, lastName, username, email)=>{
    //try {
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "PATCH",
        url: `/api/users/updateMe`,
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
        }
    }).then((result)=>{
        if (result.data.status === "success") (0, $911e61cb2e54ea36$export$84b671a5134b691)("success", "Data updated successfully!!");
    }).catch((err)=>{
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message);
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    });
};
const $fc971ce67d2c187d$export$7d9493fe7f1fbea8 = (password, currentPassword, passwordConfirm)=>{
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "PATCH",
        url: `/api/users/updatePassword`,
        data: {
            password: password,
            currentPassword: currentPassword,
            passwordConfirm: passwordConfirm
        }
    }).then((result)=>{
        if (result.data.status === "Success") (0, $911e61cb2e54ea36$export$84b671a5134b691)("success", "Password updated successfully!!");
    }).catch((err)=>{
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message);
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    });
};




const $33989f8a52fc16a4$export$71b1a95d36292477 = (budget)=>{
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "POST",
        url: `/api/budgets`,
        data: {
            budget: budget
        }
    }).then((res)=>{
        if (res.data.status === "Success") (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", "Budget created successfully!!", "Create-Budget");
    }).catch((err)=>{
        if (err.response) (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", "You have an existing budget,Delete it to create a new one ");
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    });
};
const $33989f8a52fc16a4$var$filterObj = function(obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((el)=>{
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
const $33989f8a52fc16a4$export$45ca5ce3eb0ce0a8 = (data)=>{
    const filteredData = $33989f8a52fc16a4$var$filterObj(data, "title", "allocated");
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "POST",
        url: `/api/budgets/${data.budgetId}/expenditures`,
        data: filteredData
    }).then((res)=>{
        //console.log(res);
        if (res.data.status === "Success") {
            (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", "Expense Created successfully!!,", "add-expenditure");
            setTimeout(window.location.reload(true), 500);
        }
    }).catch((err)=>{
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message);
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    //setTimeout(window.location.reload(true), 500);
    });
};
const $33989f8a52fc16a4$export$fca54c1b460d68a9 = (data)=>{
    const filteredData = $33989f8a52fc16a4$var$filterObj(data, "title", "spent", "allocated", "_id");
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "PATCH",
        url: `/api/budgets/${data.budgetId}/expenditures`,
        data: filteredData
    }).then((res)=>{
        if (res.data.status === "success") {
            (0, $911e61cb2e54ea36$export$84b671a5134b691)("success", "Expense updated successfully!!", "pop");
            setTimeout(window.location.reload(true), 500);
        }
    }).catch((err)=>{
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message, "pop");
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    //setTimeout(window.location.reload(true), 500);
    });
};
const $33989f8a52fc16a4$export$f82302593dfecf81 = (data)=>{
    const filteredData = $33989f8a52fc16a4$var$filterObj(data, "_id");
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "DELETE",
        url: `/api/budgets/${data.budgetId}/expenditures`,
        data: filteredData
    }).then((res)=>{
        if (res.status === 204) {
            (0, $911e61cb2e54ea36$export$84b671a5134b691)("success", "Expense deleted successfully!!", "pop");
            setTimeout(window.location.reload(true), 500);
        }
    }).catch((err)=>{
        console.log(err);
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message, "pop");
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    //setTimeout(window.location.reload(true), 500);
    });
};
const $33989f8a52fc16a4$export$80eaa4c22f7a64f7 = (budgetId)=>{
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "DELETE",
        url: `/api/budgets/${budgetId}`
    }).then((res)=>{
        // console.log(res);
        if (res.status === 204) {
            (0, $911e61cb2e54ea36$export$84b671a5134b691)("success", "Budget deleted successfully!!", "pop");
            setTimeout(window.location.replace("/userProfile"), 500);
        }
    }).catch((err)=>{
        console.log(err);
        if (err.response) (0, $911e61cb2e54ea36$export$84b671a5134b691)("error", err.response.data.message, "pop");
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    //setTimeout(window.location.reload(true), 500);
    });
};
const $33989f8a52fc16a4$export$cc84344e18567ce3 = (firstName, lastname, email, phone, message)=>{
    const params = {
        firstname: firstName,
        lastname: lastname,
        email: email,
        Phone: phone,
        message: message
    };
    const url = `/api/users/contact`;
    (0, ($parcel$interopDefault($rnClU$axios)))({
        method: "POST",
        url: url,
        data: params
    }).then((res)=>{
        // console.log(res);
        if (res.status === 200) (0, $911e61cb2e54ea36$export$de026b00723010c1)("success", "Message Sent successfully!!", "submitMsg");
    }).catch((err)=>{
        console.log(err);
        if (err.response) (0, $911e61cb2e54ea36$export$de026b00723010c1)("error", err.response.data.message, "submitMsg");
        else if (err.request) console.log(err.request);
        else console.log(err.message);
    //setTimeout(window.location.reload(true), 500);
    });
};



//DOM Elements
const $5dabdcb203bf0e3b$var$toggleBtn = document.querySelector(".toggle-btn");
const $5dabdcb203bf0e3b$var$toggleBar1 = document.querySelector(".toggle-bar-1");
const $5dabdcb203bf0e3b$var$toggleBar2 = document.querySelector(".toggle-bar-2");
const $5dabdcb203bf0e3b$var$toggleBar3 = document.querySelector(".toggle-bar-3");
const $5dabdcb203bf0e3b$var$mainNav = document.querySelector(".main-nav");
//Create Budget buttons
const $5dabdcb203bf0e3b$var$create_Budget_Btn = document.querySelector(".Create-Budget");
const $5dabdcb203bf0e3b$var$view_Budget_Btn = document.querySelector(".View-Budget");
const $5dabdcb203bf0e3b$var$cancel_Btn = document.querySelector("#cancel");
const $5dabdcb203bf0e3b$var$save_Btn = document.querySelector("#save");
const $5dabdcb203bf0e3b$var$delete_Budget_CTA = document.querySelector(".delete-budget");
const $5dabdcb203bf0e3b$var$delete_Budget_Btn = document.querySelector("#delete-budget");
const $5dabdcb203bf0e3b$var$backdrop = document.querySelector(".backdrop");
const $5dabdcb203bf0e3b$var$new_Budget_form = document.querySelector(".new-budget-container");
const $5dabdcb203bf0e3b$var$cancel_toggle_bar = document.querySelector(".cancel-btn");
//Expense icons
const $5dabdcb203bf0e3b$var$editExpenseIcons = document.querySelectorAll(".edit-expense");
const $5dabdcb203bf0e3b$var$deleteEXpenseIcons = document.querySelectorAll(".delete-expense");
const $5dabdcb203bf0e3b$var$editExpenseContainer = document.querySelector(".edit-budget-container");
const $5dabdcb203bf0e3b$var$deleteExpenseContainer = document.querySelector(".delete-expense-container");
const $5dabdcb203bf0e3b$var$deleteBudgetContainer = document.querySelector(".delete-budget-container");
const $5dabdcb203bf0e3b$var$cancelExpenseBtns = document.querySelectorAll(".expense-Cancel");
const $5dabdcb203bf0e3b$var$expenseTitle = document.querySelector("#expense-title");
const $5dabdcb203bf0e3b$var$allocatedExpense = document.querySelector("#expense-Allocated");
const $5dabdcb203bf0e3b$var$expenseSpent = document.querySelector("#expense-Spent");
const $5dabdcb203bf0e3b$var$percentValue = document.querySelector(".percent-value");
let $5dabdcb203bf0e3b$var$progressBars = document.querySelectorAll("#myBar");
const $5dabdcb203bf0e3b$var$update_Expense_Btn = document.querySelector("#expense-Save");
const $5dabdcb203bf0e3b$var$delete_Expense_Btn = document.querySelector("#expense-delete");
const $5dabdcb203bf0e3b$var$budget = document.querySelector(".total-allocation");
const $5dabdcb203bf0e3b$var$add_new_expenditure_btn = document.querySelector(".add-expenditure button");
const $5dabdcb203bf0e3b$var$cancel_expenditure_btn = document.querySelector(".cancel-new-expenditure");
const $5dabdcb203bf0e3b$var$newExpenditureContainer = document.querySelector(".add-new-expenditure-container form");
const $5dabdcb203bf0e3b$var$new_expenditure_title = document.querySelector("#item");
const $5dabdcb203bf0e3b$var$new_allocated_expenditure = document.querySelector("#Amount");
const $5dabdcb203bf0e3b$var$save_new_expenditure = document.querySelector(".add-new-expenditure");
const $5dabdcb203bf0e3b$var$ctx = document.getElementById("pieChart");
const $5dabdcb203bf0e3b$var$allocation_Of_All_Expenses = document.querySelectorAll(".item-budget i");
//const title_Of_All_Expenses = document.querySelectorAll(".item-name");
//Declare all the variables
const $5dabdcb203bf0e3b$var$allocated_expenses_Array = [];
const $5dabdcb203bf0e3b$var$expense_title_Array = [];
const $5dabdcb203bf0e3b$var$bgcolorArray = [];
const $5dabdcb203bf0e3b$var$borderColorArray = [];
let $5dabdcb203bf0e3b$var$expenseID, $5dabdcb203bf0e3b$var$budgetId;
//Generate a random color
const $5dabdcb203bf0e3b$var$generateMycolor = (opacity)=>{
    const randomColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 240)},${opacity})`;
    return randomColor;
};
//Collection of data to be used in the chart
if ($5dabdcb203bf0e3b$var$allocation_Of_All_Expenses) $5dabdcb203bf0e3b$var$allocation_Of_All_Expenses.forEach((el)=>{
    let currentExpenseTitle = el.parentElement.parentElement.previousSibling.firstChild.firstChild.textContent;
    $5dabdcb203bf0e3b$var$allocated_expenses_Array.push(Number(el.textContent));
    $5dabdcb203bf0e3b$var$bgcolorArray.push($5dabdcb203bf0e3b$var$generateMycolor(0.2));
    $5dabdcb203bf0e3b$var$borderColorArray.push($5dabdcb203bf0e3b$var$generateMycolor(1));
    $5dabdcb203bf0e3b$var$expense_title_Array.push(currentExpenseTitle);
});
//The Chart Illustration Setup
if ($5dabdcb203bf0e3b$var$ctx) {
    const myChart = new (0, ($parcel$interopDefault($rnClU$chartjs)))($5dabdcb203bf0e3b$var$ctx, {
        type: "pie",
        data: {
            labels: $5dabdcb203bf0e3b$var$expense_title_Array,
            datasets: [
                {
                    data: $5dabdcb203bf0e3b$var$allocated_expenses_Array,
                    backgroundColor: $5dabdcb203bf0e3b$var$bgcolorArray,
                    borderColor: $5dabdcb203bf0e3b$var$borderColorArray,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "The Expenses Chart"
            },
            legend: {
                display: true,
                labels: {
                    fontColor: "rgb(255,99,132)",
                    fontSize: 10
                }
            }
        }
    });
}
if ($5dabdcb203bf0e3b$var$budget) $5dabdcb203bf0e3b$var$budgetId = $5dabdcb203bf0e3b$var$budget.getAttribute("data-id");
//const budgetId = budget.getAttribute("data-id");
if ($5dabdcb203bf0e3b$var$delete_Budget_CTA) $5dabdcb203bf0e3b$var$delete_Budget_CTA.addEventListener("click", ()=>{
    $5dabdcb203bf0e3b$var$deleteBudgetContainer.style.display = "block";
    $5dabdcb203bf0e3b$var$backdrop.style.display = "block";
});
if ($5dabdcb203bf0e3b$var$delete_Budget_Btn) $5dabdcb203bf0e3b$var$delete_Budget_Btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    await (0, $33989f8a52fc16a4$export$80eaa4c22f7a64f7)($5dabdcb203bf0e3b$var$budgetId);
    $5dabdcb203bf0e3b$var$deleteBudgetContainer.style.display = "none";
});
if ($5dabdcb203bf0e3b$var$add_new_expenditure_btn) $5dabdcb203bf0e3b$var$add_new_expenditure_btn.addEventListener("click", ()=>{
    $5dabdcb203bf0e3b$var$newExpenditureContainer.style.display = "block";
    $5dabdcb203bf0e3b$var$add_new_expenditure_btn.style.display = "none";
});
if ($5dabdcb203bf0e3b$var$cancel_expenditure_btn) $5dabdcb203bf0e3b$var$cancel_expenditure_btn.addEventListener("click", (e)=>{
    e.preventDefault();
    $5dabdcb203bf0e3b$var$newExpenditureContainer.style.display = "none";
    $5dabdcb203bf0e3b$var$add_new_expenditure_btn.style.display = "inline";
});
if ($5dabdcb203bf0e3b$var$save_new_expenditure) $5dabdcb203bf0e3b$var$save_new_expenditure.addEventListener("click", async (e)=>{
    e.preventDefault();
    const data = {
        budgetId: $5dabdcb203bf0e3b$var$budgetId,
        title: $5dabdcb203bf0e3b$var$new_expenditure_title.value,
        allocated: $5dabdcb203bf0e3b$var$new_allocated_expenditure.value
    };
    await (0, $33989f8a52fc16a4$export$45ca5ce3eb0ce0a8)(data);
    $5dabdcb203bf0e3b$var$add_new_expenditure_btn.style.display = "inline";
    $5dabdcb203bf0e3b$var$newExpenditureContainer.style.display = "none";
});
if ($5dabdcb203bf0e3b$var$editExpenseIcons) $5dabdcb203bf0e3b$var$editExpenseIcons.forEach((el)=>el.addEventListener("click", ()=>{
        $5dabdcb203bf0e3b$var$editExpenseContainer.style.display = "block";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "block";
        $5dabdcb203bf0e3b$var$expenseID = el.parentElement.getAttribute("data-id");
        $5dabdcb203bf0e3b$var$expenseTitle.value = el.previousSibling.textContent;
        $5dabdcb203bf0e3b$var$allocatedExpense.value = el.parentElement.parentElement.nextSibling.firstChild.lastChild.textContent;
        $5dabdcb203bf0e3b$var$expenseSpent.value = el.parentElement.parentElement.nextSibling.lastChild.lastChild.textContent;
    }));
if ($5dabdcb203bf0e3b$var$deleteEXpenseIcons) $5dabdcb203bf0e3b$var$deleteEXpenseIcons.forEach((el)=>{
    el.addEventListener("click", ()=>{
        $5dabdcb203bf0e3b$var$deleteExpenseContainer.style.display = "block";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "block";
        $5dabdcb203bf0e3b$var$expenseID = el.parentElement.getAttribute("data-id");
    });
});
if ($5dabdcb203bf0e3b$var$cancelExpenseBtns) $5dabdcb203bf0e3b$var$cancelExpenseBtns.forEach((el)=>{
    el.addEventListener("click", ()=>{
        $5dabdcb203bf0e3b$var$editExpenseContainer.style.display = "none";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "none";
        $5dabdcb203bf0e3b$var$deleteExpenseContainer.style.display = "none";
        $5dabdcb203bf0e3b$var$deleteBudgetContainer.style.display = "none";
    });
});
if ($5dabdcb203bf0e3b$var$progressBars) $5dabdcb203bf0e3b$var$progressBars.forEach((el)=>{
    el.style.width = el.parentElement.nextSibling.textContent;
});
if ($5dabdcb203bf0e3b$var$delete_Expense_Btn) $5dabdcb203bf0e3b$var$delete_Expense_Btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const data = {
        budgetId: $5dabdcb203bf0e3b$var$budgetId,
        _id: $5dabdcb203bf0e3b$var$expenseID
    };
    console.log(data);
    await (0, $33989f8a52fc16a4$export$f82302593dfecf81)(data);
});
if ($5dabdcb203bf0e3b$var$update_Expense_Btn) $5dabdcb203bf0e3b$var$update_Expense_Btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const data = {
        budgetId: $5dabdcb203bf0e3b$var$budgetId,
        title: $5dabdcb203bf0e3b$var$expenseTitle.value,
        allocated: $5dabdcb203bf0e3b$var$allocatedExpense.value,
        spent: $5dabdcb203bf0e3b$var$expenseSpent.value,
        _id: $5dabdcb203bf0e3b$var$expenseID
    };
    await (0, $33989f8a52fc16a4$export$fca54c1b460d68a9)(data);
});
if ($5dabdcb203bf0e3b$var$create_Budget_Btn) {
    $5dabdcb203bf0e3b$var$create_Budget_Btn.addEventListener("click", ()=>{
        $5dabdcb203bf0e3b$var$new_Budget_form.style.display = "block";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "block";
    });
    $5dabdcb203bf0e3b$var$cancel_toggle_bar.addEventListener("click", ()=>{
        $5dabdcb203bf0e3b$var$new_Budget_form.style.display = "none";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "none";
    });
    document.querySelector(".save-budget").addEventListener("click", async (e)=>{
        e.preventDefault();
        const budget = document.querySelector("#Gross-Budget").value;
        await (0, $33989f8a52fc16a4$export$71b1a95d36292477)(budget);
        $5dabdcb203bf0e3b$var$new_Budget_form.style.display = "none";
        $5dabdcb203bf0e3b$var$backdrop.style.display = "none";
    });
}
//This is for the Contact Us Page
if (document.querySelector(".Contact-Us")) {
    const submitBtn = document.forms[0][5];
    submitBtn.addEventListener("click", async (e)=>{
        e.preventDefault();
        let firstName = document.querySelector("#firstname").value;
        let lastname = document.querySelector("#lastname").value;
        let email = document.querySelector("#email").value;
        let phone = document.querySelector("#phone-number").value;
        let message = document.querySelector("#message").value;
        await (0, $33989f8a52fc16a4$export$cc84344e18567ce3)(firstName, lastname, email, phone, message);
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
    // const signUpMessage = document.querySelector(".sign-up-message");
    // const loginLink = document.querySelector(".login-link");
    // const loader = document.querySelector(".loader");
    signUpBtn.addEventListener("click", async (e)=>{
        e.preventDefault();
        let firstName = document.forms.signUp.elements.firstname.value;
        let lastName = document.forms.signUp.elements.lastname.value;
        let username = document.forms.signUp.elements.username.value;
        let email = document.forms.signUp.elements.email.value;
        let password = document.forms.signUp.elements.password.value;
        let passwordConfirm = document.forms.signUp.elements.passwordConfirm.value;
        const details = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        };
        await (0, $c80e3ae494eaa506$export$cf64224bcd829024)(details);
        firstName = "";
        lastName = "";
        username = "";
        email = "";
        password = "";
        passwordConfirm = "";
    });
}
//This is for the login page
if (document.forms.signIn) //const rememberMeBtn = document.forms[0][3];
document.forms.signIn[2].addEventListener("click", function(e) {
    e.preventDefault();
    let username = document.forms.signIn.elements.username.value;
    let password = document.forms.signIn.elements.password.value;
    const details = {
        username: username,
        password: password
    };
    (0, $7abda2fae5c78272$export$596d806903d1f59e)(details); //this controls what happens when the submit is clicked
    username = "";
    password = "";
});
//this is the log out function
if (document.querySelector("#log-out")) document.querySelector("#log-out").addEventListener("click", (e)=>{
    e.preventDefault();
    (0, $7abda2fae5c78272$export$464881f0a7cf0212)();
});
//This is the forget password function
if (document.forms.forgetPassword) document.forms.forgetPassword.submit.addEventListener("click", (e)=>{
    e.preventDefault();
    let email = document.forms.forgetPassword.elements.email.value;
    const details = {
        email: email
    };
    (0, $7abda2fae5c78272$export$673d147991b6b950)(details);
    email = "";
});
//This is the reset password function
if (document.forms.resetPassword) document.forms.resetPassword.submit.addEventListener("click", (e)=>{
    e.preventDefault();
    const token = document.forms.resetPassword.getAttribute("data-id");
    let password = document.forms.resetPassword.elements.password.value;
    let passwordConfirm = document.forms.resetPassword.elements.passwordConfirm.value;
    const details = {
        password: password,
        passwordConfirm: passwordConfirm
    };
    (0, $7abda2fae5c78272$export$99d837dc30eb1ef7)(details, token);
    password = "";
    passwordConfirm = "";
});
//This is for the user Profile Page
if (document.querySelector(".user-account")) document.querySelector("#save").addEventListener("click", (e)=>{
    e.preventDefault();
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const username = document.querySelector("#user-name").value;
    const email = document.querySelector("#e-mail").value;
    (0, $fc971ce67d2c187d$export$3bf0495508a61ee)(firstName, lastName, username, email);
});
//This is for the user Profile Page where we update the password
if (document.querySelector(".user-password")) document.querySelector("#update").addEventListener("click", async (e)=>{
    e.preventDefault();
    const password = document.querySelector("#password").value;
    const currentPassword = document.querySelector("#currentPassword").value;
    const passwordConfirm = document.querySelector("#passwordConfirm").value;
    (0, $fc971ce67d2c187d$export$7d9493fe7f1fbea8)(password, currentPassword, passwordConfirm);
});
let $5dabdcb203bf0e3b$var$click = 0;
$5dabdcb203bf0e3b$var$toggleBtn.addEventListener("click", function() {
    if ($5dabdcb203bf0e3b$var$click % 2 == 0) {
        $5dabdcb203bf0e3b$var$mainNav.style.left = "0";
        $5dabdcb203bf0e3b$var$toggleBar1.style.opacity = "0";
        $5dabdcb203bf0e3b$var$toggleBar2.style.transform = "rotateZ(45deg) translateX(6px)";
        $5dabdcb203bf0e3b$var$toggleBar3.style.transform = "rotateZ(-45deg) translateX(4px) translateY(2px)";
    } else {
        $5dabdcb203bf0e3b$var$mainNav.style.left = "-300px";
        $5dabdcb203bf0e3b$var$toggleBar1.style.opacity = "1";
        $5dabdcb203bf0e3b$var$toggleBar2.style.transform = "rotateZ(0) translateX(0)";
        $5dabdcb203bf0e3b$var$toggleBar3.style.transform = "rotateZ(0) translateX(0) translateY(0)";
    }
    $5dabdcb203bf0e3b$var$click++;
});
$5dabdcb203bf0e3b$var$mainNav.addEventListener("click", async function(e) {
    for(let i = 0; i < $5dabdcb203bf0e3b$var$mainNav.children.length; i++)if (e.target.textContent == $5dabdcb203bf0e3b$var$mainNav.children[i].textContent) {
        if (e.target.textContent === "LogOut") await (0, $7abda2fae5c78272$export$464881f0a7cf0212)();
        $5dabdcb203bf0e3b$var$click++;
        $5dabdcb203bf0e3b$var$mainNav.style.left = "-300px";
        $5dabdcb203bf0e3b$var$toggleBar1.style.opacity = "1";
        $5dabdcb203bf0e3b$var$toggleBar2.style.transform = "rotateZ(0) translateX(0)";
        $5dabdcb203bf0e3b$var$toggleBar3.style.transform = "rotateZ(0) translateX(0) translateY(0)";
        break;
    }
});


//# sourceMappingURL=bundle.js.map
