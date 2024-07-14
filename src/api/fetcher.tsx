import { store } from "@/redux/store";
import axios from "axios";

const config = {
  BASE_URL: "http://localhost:8000/",
  TIME_OUT: 30000,
};

export const fetcher = axios.create({
  withCredentials: true,
  baseURL: config.BASE_URL,
  timeout: config.TIME_OUT,
});

fetcher.interceptors.request.use(
  function (request) {
    const state = store.getState();
    const accessToken = state?.token.accessToken;
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
