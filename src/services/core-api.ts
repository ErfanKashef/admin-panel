import axios from "axios";

export const coreApi = axios.create({
  baseURL: `https://reqres.in/api/`,
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});
