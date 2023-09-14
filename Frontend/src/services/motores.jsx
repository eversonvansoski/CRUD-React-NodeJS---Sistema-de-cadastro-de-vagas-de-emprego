import { get, post } from "./base";

let getAll = () => {
  return get("/Engine");
};

let getByParameters = (veiculoId, versaoId) => {
  return get("/Engine/Find/?vehicleId=" + veiculoId + "&versionId=" + versaoId);
};

export { getAll, getByParameters };
