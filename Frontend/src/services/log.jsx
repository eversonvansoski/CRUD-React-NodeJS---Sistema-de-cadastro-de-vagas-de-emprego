import axios from "axios";
import { baseUrl } from "./base";

const baseAxios = axios.create({
  baseURL: baseUrl,
});

let getAll = () => {
  return baseAxios.get("/elmah", {
    headers: {
      "Content-Type": "text/html",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
};

export { getAll };
