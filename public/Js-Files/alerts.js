export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.parentElement.removeChild(el);
  }
};
export const showAlert = (type, msg, attribute) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  console.log(attribute);
  if (attribute) {
    document
      .querySelector(`.${attribute}`)
      .insertAdjacentHTML("afterend", markup);
  } else {
    document.querySelector("section").insertAdjacentHTML("beforeend", markup);
  }
  window.setTimeout(hideAlert, 5000);
};

export const showUpdateAlert = (type, msg, pop) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  if (pop) {
    document
      .querySelector(".edit-budget-container")
      .insertAdjacentHTML("beforeend", markup);
    return window.setTimeout(hideAlert, 5000);
  }
  document.querySelector("section").insertAdjacentHTML("beforebegin", markup);
  window.setTimeout(hideAlert, 5000);
};
