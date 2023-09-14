import { get, post } from "./base";

let getAll = () => {
  return get("/VehicleVersion");
};
let getById = (id) => {
  return get("/VehicleVersion/" + id);
};
let getByModelo = (marcaId, modeloId, anoId) => {
  return get(
    "/VehicleVersion/FindByYear/" +
      anoId +
      "?brandId=" +
      marcaId +
      "&vehicleId=" +
      modeloId
  );
};

export { getAll, getById, getByModelo };
