import axios from "axios";
let API_URL = "https://localhost:44382/api";
const callApi = (endpoint, method = "GET", body) => {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((error) => {
    if (error.response) {
      console.log("response", error.response);
    } else if (error.request) {
      console.log("error", error.request);
    } else if (error.message) {
      console.log("message", error.message);
    }
  });
};
export default callApi;

export function GET_LIST_STUDENTS(endpoint) {
  return callApi(endpoint, "GET");
}
export function ADD_NEW_LIST_STUDENT(endpoint, data) {
  return callApi(endpoint, "POST", data);
}
