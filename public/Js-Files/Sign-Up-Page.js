import axios from "axios";
import { showAlert } from "./alerts";

const makeApiCall = async (url, data) => {
  try {
    const res = await axios({
      method: "post",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", res.data.data.message);
      window.setTimeout(location.assign("/SignIn"), 5000);
    }
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    showAlert("error", err.response.data.message);
    //console.log(error.response.data);
  }
};

export const signUp = async (details) => {
  const url = `/api/users/signUp`;
  await makeApiCall(url, details);
};
