import axios from "axios";
let API_URL = "https://localhost:5001/api";
const callApi = (endpoint, method = "GET", body) => {
  return (
    axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data: body,
    })
      // .then((result) => {
      //   console.log(result.data);
      // })
      .catch((error) => {
        if (error.response) {
          console.log("response", error.response);
        } else if (error.request) {
          console.log("error", error.request);
        } else if (error.message) {
          console.log("message", error.message);
        }
      })
  );
};
export default callApi;

export function GET_ALL_PRODUCTS(endpoint) {
  return callApi(endpoint, "GET");
}
export function GET_PRODUCT_ID(endpoint, id) {
  return callApi(endpoint + "/" + id, "GET");
}
export function POST_ADD_PRODUCT(endpoint, data) {
  return callApi(endpoint, "POST", data);
}
export function PUT_EDIT_PRODUCT(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}
export function DELETE_PRODUCT_ID(endpoint) {
  return callApi(endpoint, "DELETE");
}
export function GET_ALL_CATEGORIES(endpoint) {
  return callApi(endpoint, "GET");
}
