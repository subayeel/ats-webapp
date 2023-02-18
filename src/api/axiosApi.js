import axios from "axios";
const BASE_URL = "";
export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  header: { "Content-Type": "application/json" },
  withCredentials: true,
});
