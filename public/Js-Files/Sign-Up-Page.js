import axios from "axios";
import { showAlert } from "./alerts";

const makeApiCall = async (url, data) => {
  try {
    const res = await axios({
      method: "post",
      url,
      data,
    });
    console.log(res);
    if (res.data.status === "success") {
      showAlert("success", res.data.data.message);
      window.setTimeout(window.location.replace("/SignIn"), 5000);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
    //console.log(error.response.data);
  }
};

export const signUp = async (details) => {
  const url = `/api/users/signUp`;
  await makeApiCall(url, details);
  console.log(details);
};
