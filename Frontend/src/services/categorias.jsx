import { get } from "./base";

let getAll = () => {
  return get("/Category");
};
let getByEngine = (engineId) => {
  return get("/Category/FindByEngine/" + engineId);
};

export { getAll, getByEngine };
