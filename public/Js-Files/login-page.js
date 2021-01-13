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
      showAlert("success", "logged in successful !!");
      window.setTimeout(window.location.replace("/userProfile"), 2000);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};

export const login = async (user, password) => {
  if (user && password) {
    let params = {
      username: user,
      password: password,
    };
    const url = `http://localhost:4400/api/users/login`;
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
    await makeApiCall(url, params);
  }
};
export const logOut = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `http://localhost:4400/api/users/logOut`,
    });

    if (res.data.status === "success") {
      //showAlert("success", "logged in successful !!");
      //location.reload(true);
      window.setTimeout(window.location.assign("/"), 1000);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};
