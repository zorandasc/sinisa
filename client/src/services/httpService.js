import axios from "axios";
import { toast } from "react-toastify";

//GLOBAL HANDLER FOR UNEXSPECTED ERRORS
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("UNEXSPECTED ERROR OCURED", error);
    toast.error(`AN UNEXPECTED ERROR OCCURRED. `, { theme: "colored" });
  }

  return Promise.reject(error);
});

//SET JWT TOKEN WHEN SENDING REWUEST TO BACKEND
function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
