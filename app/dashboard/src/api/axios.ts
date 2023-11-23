import { HttpError } from "@refinedev/core";
import axios from "axios";

export const API_URL = "http://localhost:3000";

export const TOKEN_KEY = "coblocks-access-token";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);
