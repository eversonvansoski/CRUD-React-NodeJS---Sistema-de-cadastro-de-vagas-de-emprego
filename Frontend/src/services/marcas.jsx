import { get, post } from "./base";

let getAll = () => {
  return get("/Brand");
};
let getById = (id) => {
  return get("/Brand/" + id);
};
export { getAll, getById };
