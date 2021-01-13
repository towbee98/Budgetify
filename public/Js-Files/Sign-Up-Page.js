let form = document.forms[0];
let enteredUsername = document.forms[0][0];
let enteredFullname = document.forms[0][1];
let enteredPassword = document.forms[0][3];
let enteredEmail = document.forms[0][2];
const signUpBtn = document.forms[0][4];
const signUpMessage = document.querySelector(".sign-up-message");
const loginLink = document.querySelector(".login-link");
const loader = document.querySelector(".loader");

signUpBtn.addEventListener("click", function () {
  //this controls what happens when the sign up button is clicked
  let user = enteredUsername.value; //assign each
  let password = enteredPassword.value; // of the
  let fullName = enteredFullname.value; //user inputs
  let email = enteredEmail.value; //to a variable
  event.preventDefault(); //this prevents the form from submitting
  if (user && password && fullName && email) {
    let params = {
      //this stores the user details in an object
      username: user,
      password: password,
      fullName: fullName,
      email: email,
    };
    const url = "http://localhost:3000/api/user"; //this is the api link for registeration
    $.ajax({
      type: "POST",
      url: url,
      dataType: "json",

      beforeSend: function () {
        //this
        $(".loader").show();
      },

      complete: function () {
        $(".loader").hide();
      },
    });
    makeApiCall(url, params);
  }
  enteredUsername.value = "";
  enteredPassword.value = "";
  enteredFullname.value = "";
  enteredEmail.value = "";
});
function makeApiCall(url, params) {
  const myheaders = new Headers({
    Accept: "application/JSON",
    "Content-Type": "application/JSON",
  });
  const request = new Request(url, {
    method: "POST",
    headers: myheaders,
    body: JSON.stringify(params),
  });

  fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((response) => (msg = Object.values(response)[0]))
    .then(() => {
      signUpMessage.textContent = msg;
      signUpMessage.style.display = "block";
      loginLink.style.display = "block";
    })
    .catch((error) => console.log(` error occured : ${error}`));
}
signUpMessage.style.display = "block";
