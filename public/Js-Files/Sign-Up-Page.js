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
        "Sign Up successful,Check the  your email to login or you can wait to be redirected to the login page!!"
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
