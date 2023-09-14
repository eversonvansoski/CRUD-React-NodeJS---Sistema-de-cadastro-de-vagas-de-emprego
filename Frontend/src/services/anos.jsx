import { get, post } from "./base";

let getAll = () => {
  return get("/VehicleYear");
};
let getById = (id) => {
  return get("/VehicleYear/" + id);
};
let getByVersao = (marcaId, modeloId) => {
  return get(
    "/VehicleYear/FindByBrandAndVehicle/" + modeloId + "?brandId=" + marcaId
  );
};

export { getAll, getById, getByVersao };
