import axios from "axios";
import { error } from "console";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 10000,
});

instace.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instace.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instace;
