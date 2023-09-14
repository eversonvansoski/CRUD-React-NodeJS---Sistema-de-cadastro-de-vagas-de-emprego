import { get, destroy, post, postFiles, put } from "./base";

let getAll = () => {
  return get("/Content");
};
let getById = (id) => {
  return get("/Content/" + id);
};
let getContentById = (id) => {
  return get("/ContentValue/FindByContent/" + id);
};
let getByParameters = (marcaId, modeloId, versaoId, ano, motorId) => {
  let url = "/Content/Find?";

  if (marcaId > 0) url += "brandId=" + marcaId + "&";
  if (modeloId > 0) url += "vehicleId=" + modeloId + "&";
  if (versaoId > 0) url += "versionVehicleId=" + versaoId + "&";
  if (ano > 0) url += "year=" + ano + "&";
  if (motorId > 0) url += "engineId=" + motorId + "&";

  return get(url);
};
let deleteContent = (conteudoId) => {
  return destroy("/Content/" + conteudoId);
};

let importSpreadsheet = (file) => {
  return postFiles("/Content/Import", file);
};

let create = (
  id,
  marca,
  modelo,
  versao,
  anoInicio,
  anoFim,
  motor,
  categoria,
  subcategoria,
  marcaId,
  modeloId,
  versaoId,
  anoInicioId,
  anoFimId,
  motorId,
  categoriaId,
  subcategoriaId,
  itensConteudo
) => {
  let contentValue = [];
  itensConteudo.map(function (i) {
    contentValue = contentValue.concat({
      id: 0,
      contentId: 0,
      contentPropertyValueId: 0,
      contentPropertyValue: {
        id: 0,
        value: i.item.valor,
        createdDate: "2022-08-16T22:03:21.423Z",
        contentPropertyId: i.item.id,
        contentProperty: {
          id: i.item.id,
          name: i.item.nome,
          enabled: true,
        },
      },
    });
  });

  let body = {
    id: id,
    brand: {
      id: marcaId,
      name: marca,
      enabled: true,
    },
    vehicle: {
      id: modeloId,
      name: modelo,
      enabled: true,
    },
    vehicleVersion: {
      id: versaoId,
      version: versao,
      enabled: true,
    },
    vehicleYear: {
      id: anoInicioId,
      year: anoInicio,
      enabled: true,
    },
    vehicleYearEnd: {
      id: anoFimId,
      year: anoFim,
      enabled: true,
    },
    engine: {
      id: motorId,
      description: motor,
      enabled: true,
    },
    category: {
      id: categoriaId,
      description: categoria,
      enabled: true,
    },
    subCategory: {
      id: subcategoriaId,
      description: subcategoria,
      enabled: true,
    },
    contentValue: contentValue,
  };
  return post("/Content/", body);
};

let update = (
  id,
  marca,
  modelo,
  versao,
  anoInicio,
  anoFim,
  motor,
  categoria,
  subcategoria,
  marcaId,
  modeloId,
  versaoId,
  anoInicioId,
  anoFimId,
  motorId,
  categoriaId,
  subcategoriaId,
  itensConteudo
) => {
  let contentValue = [];
  itensConteudo.map(function (i) {
    contentValue = contentValue.concat({
      id: 0,
      contentId: 0,
      contentPropertyValueId: 0,
      contentPropertyValue: {
        id: 0,
        value: i.item.valor,
        createdDate: "2022-08-16T22:03:21.423Z",
        contentPropertyId: i.item.id,
        contentProperty: {
          id: i.item.id,
          name: i.item.nome,
          enabled: true,
        },
      },
    });
  });

  let body = {
    id: id,
    brand: {
      id: marcaId,
      name: marca,
      enabled: true,
    },
    vehicle: {
      id: modeloId,
      name: modelo,
      enabled: true,
    },
    vehicleVersion: {
      id: versaoId,
      version: versao,
      enabled: true,
    },
    vehicleYear: {
      id: anoInicioId,
      year: anoInicio,
      enabled: true,
    },
    vehicleYearEnd: {
      id: anoFimId,
      year: anoFim,
      enabled: true,
    },
    engine: {
      id: motorId,
      description: motor,
      enabled: true,
    },
    category: {
      id: categoriaId,
      description: categoria,
      enabled: true,
    },
    subCategory: {
      id: subcategoriaId,
      description: subcategoria,
      enabled: true,
    },
    contentValue: contentValue,
  };
  return put("/Content/" + id, body);
};

export {
  getAll,
  getById,
  getContentById,
  getByParameters,
  deleteContent,
  create,
  update,
  importSpreadsheet,
};
