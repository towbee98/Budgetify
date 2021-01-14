import axios from "axios";
import { showAlert } from "./alerts";

const makeApiCall = async (url, params) => {
  try {
    const res = await axios({
      method: "post",
      url,
      data: params,
    });

    if (res.data.status === "Success") {
      showAlert(
        "success",
        "Sign Up successful,Check the Spam folder of your email to login or you can wait to be redirected to the login page!!"
      );
      window.setTimeout(window.location.replace("/SignIn"), 5000);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};

export const signUp = async (
  firstName,
  lastName,
  username,
  email,
  password,
  passwordConfirm
) => {
  const params = {
    firstName,
    lastName,
    username,
    email,
    password,
    passwordConfirm,
  };
  const url = `/api/users/signUp`;
  await makeApiCall(url, params);
};
// signUpBtn.addEventListener("click", function () {
//   //this controls what happens when the sign up button is clicked
//   let user = userName; //assign each
//   let password = password; // of the
//   let passwordConfirm = passwordConfirm;
//   let firstName = firstName; //user inputs
//   let email = email; //to a variable
//   let lastName = lastName;
//   event.preventDefault(); //this prevents the form from submitting
//   if (user && password && passwordConfirm && firstName && lastName && email) {
//     let params = {
//       //this stores the user details in an object
//       username: user,
//       password: password,
//       passwordConfirm,
//       firstName,
//       lastName,
//       email,
//     };
//     const url = "/api/user/signUp"; //this is the api link for registration
//     // $.ajax({
//     //   type: "POST",
//     //   url: url,
//     //   dataType: "json",

//     //   beforeSend: function () {
//     //     //this
//     //     $(".loader").show();
//     //   },

//     //   complete: function () {
//     //     $(".loader").hide();
//     //   },
//     // });
//     makeApiCall(url, params);
//   }
//   enteredUsername.value = "";
//   enteredPassword.value = "";
//   enteredFullname.value = "";
//   enteredEmail.value = "";
// });

// function makeApiCall(url, params) {
//   const myheaders = new Headers({
//     Accept: "application/JSON",
//     "Content-Type": "application/JSON",
//   });
//   const request = new Request(url, {
//     method: "POST",
//     headers: myheaders,
//     body: JSON.stringify(params),
//   });

//   fetch(request)
//     .then((response) => {
//       if (response.ok) {
//         console.log(response.json());
//         return response.json();
//       } else {
//         return Promise.reject(response);
//       }
//     })
//     .then((response) => (msg = Object.values(response)[0]))
//     .then(() => {
//       signUpMessage.textContent = msg;
//       signUpMessage.style.display = "block";
//       loginLink.style.display = "block";
//     })
//     .catch((error) => console.log(` error occured : ${error}`));
// }
// signUpMessage.style.display = "block";
