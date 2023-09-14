import { get } from "./base";

let getAll = () => {
  return get("/SubCategory");
};
let getById = (id) => {
  return get("/SubCategory/" + id);
};
let getByCategoria = (categoriaId) => {
  return get("/SubCategory/FindByCategory/" + categoriaId);
};

export { getAll, getById, getByCategoria };
