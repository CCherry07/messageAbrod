import axios from "axios";

const BASE_URL = "https://httpbin.org";
const TIMEOUT = 5000;
const $http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

$http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

$http.interceptors.response.use(
  (res) => {
    return {
      data: res.data,
      status: res.status,
    };
  },
  (err) => {
    console.log(err);
  }
);

export default $http;
