import { get, post } from "./base";

let getAll = () => {
  return get("/Vehicle");
};
let getById = (id) => {
  return get("/Vehicle/" + id);
};
let getByMarca = (marcaId) => {
  return get("/Vehicle/FindByBrand/" + marcaId);
};

export { getAll, getById, getByMarca };
