import { get } from "./base";

let getAllByClient = () => {
  return get("/Reports/AccessByClient");
};

let getAllByContent = () => {
return get("/Reports/AccessByContent");
};

let getByParameters = (veiculoId, versaoId) => {
  return get("/Engine/Find/?vehicleId=" + veiculoId + "&versionId=" + versaoId);
};

export { getAllByClient, getAllByContent, getByParameters };
