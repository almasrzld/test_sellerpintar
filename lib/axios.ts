import axios from "axios";

import { APP_URL } from "@/constants/config";
import { getToken } from "./utils";

export const axiosInstance = axios.create({
  baseURL: APP_URL,
});

export const axiosInstanceToken = axios.create({
  baseURL: APP_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
