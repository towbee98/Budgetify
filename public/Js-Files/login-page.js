import axios from "axios";
import { showAlert } from "./alerts";

const makeApiCall = async (url, method, params) => {
  try {
    const res = await axios({
      method,
      url,
      data: params,
    });
    return res;
  } catch (error) {
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};

//login function
export const login = async (details) => {
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
    const res = await makeApiCall(url, method, details);
    if (res.data.status === "Success") {
      showAlert("success", "Login Successful !!");
      window.setTimeout(window.location.replace("/userProfile"), 2000);
    }
  } catch (error) {
    console.log(error);
  }
};

//logout function
export const logOut = async () => {
  try {
    method = "GET";
    url = `/api/users/logOut`;
    const res = await makeApiCall(url, method);
    if (res.data.status === "success") {
      window.setTimeout(window.location.assign("/"), 5000);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};

//forget password
export const submitEmail = async (details) => {
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

    const res = await makeApiCall(url, method, details);
    if (res.data.status === "Success") {
      showAlert("success", res.data.message);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.data.message);
  }
};

//reset password function
export const changePassword = async (details, token) => {
  try {
    const url = `/api/users/resetPassword/${token}`;
    const method = "PATCH";
    const res = await makeApiCall(url, method, details);
    if (res.data.status === "Success") {
      showAlert("success", res.data.message);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.data.message);
  }
};
