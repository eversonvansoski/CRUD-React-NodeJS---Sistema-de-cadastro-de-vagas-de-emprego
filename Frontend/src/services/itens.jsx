import { get } from "./base";

let getAll = () => {
  return get("/itens");
};
let getByVeiculo = (ref) => {
  return get("/itens?id_veiculo=" + ref);
};
let getByCategoria = (ref) => {
  return get("/itens?n1=" + ref);
};
let getBySubcategoria = (ref) => {
  return get("/itens?n2=" + ref);
};

export { getAll, getByVeiculo, getByCategoria, getBySubcategoria };
