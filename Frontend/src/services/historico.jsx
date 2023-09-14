import { get } from "./base";

let getAll = () => {
  return get("/Reports/GetLastFetchedContent");
};

export { getAll };
