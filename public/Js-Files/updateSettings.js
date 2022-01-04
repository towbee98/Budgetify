import axios from "axios";
import { showUpdateAlert } from "./alerts";

export const updateData = (firstName, lastName, username, email) => {
  //try {
  axios({
    method: "PATCH",
    url: `/api/users/updateMe`,
    data: {
      firstName,
      lastName,
      username,
      email,
    },
  })
    .then((result) => {
      if (result.data.status === "success") {
        showUpdateAlert("success", "Data updated successfully!!");
      }
    })
    .catch((err) => {
      if (err.response) {
        showUpdateAlert("error", err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    });
};

export const updatePasswordData = (
  password,
  currentPassword,
  passwordConfirm
) => {
  axios({
    method: "PATCH",
    url: `/api/users/updatePassword`,
    data: {
      password,
      currentPassword,
      passwordConfirm,
    },
  })
    .then((result) => {
      if (result.data.status === "Success") {
        showUpdateAlert("success", "Password updated successfully!!");
      }
    })
    .catch((err) => {
      if (err.response) {
        showUpdateAlert("error", err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    });
};
