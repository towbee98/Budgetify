const create_Budget_Btn = document.querySelector(".Create-Budget");
const view_Budget_Btn = document.querySelector(".View-Budget");
const cancel_Btn = document.querySelector("#cancel");
const save_Btn = document.querySelector("#save");
const backdrop = document.querySelector(".backdrop");
const new_Budget_form = document.querySelector(".new-budget-container");
const cancel_toggle_bar = document.querySelector(".cancel-btn");

create_Budget_Btn.addEventListener("click", () => {
  new_Budget_form.style.display = "block";
  backdrop.style.display = "block";
});
cancel_toggle_bar.addEventListener("click", () => {
  new_Budget_form.style.display = "none";
  backdrop.style.display = "none";
});
