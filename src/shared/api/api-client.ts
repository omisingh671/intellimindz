import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const apiRawClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
