let getScreenSize = () => {
  return { h: window.screen.height, w: window.screen.width };
};

let getDataToken = () => {
  let token = localStorage.getItem("token");

  let objToken = {
    id: 0,
    nome: "",
    tipoId: 0,
    iat: 0,
    exp: 0,
  };

  if (token) {
    var dataToken = JSON.parse(atob(token.split(".")[1]));

    objToken.id = dataToken.id;
    objToken.nome = dataToken.nome;
    objToken.tipoId = dataToken.tipoId;
    objToken.iat = dataToken.iat;
    objToken.exp = dataToken.exp;
    return objToken;
  }
};
let setTitle = (title) => {
  document.title = title;
};

export { getDataToken, getScreenSize, setTitle };
