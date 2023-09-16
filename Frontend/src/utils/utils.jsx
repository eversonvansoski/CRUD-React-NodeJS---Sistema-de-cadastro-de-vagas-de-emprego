import { logout as exit, refreshToken as reToken } from "../services/login";

/* let refreshToken = () => {
  const service = reToken(
    localStorage.getItem("accessToken"),
    localStorage.getItem("refreshToken"),
    localStorage.getItem("keepLoggedIn") === "true" ? true : false
  );
  service
    .then((data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      //window.location.href = localStorage.getItem("lastURL");
    })
    .catch((e) => {
      console.log(e);
      //window.location.href = "/Login";
    });
}; */

let getScreenSize = () => {
  return { h: window.screen.height, w: window.screen.width };
};

let getDataToken = () => {
  let token = localStorage.getItem("accessToken");

  let objToken = {
    nameidentifier: "",
    name: "",
    rule: 0,
    exp: 0,
    accessmenu: [],
  };

  if (token !== null && token !== "") {
    var dataToken = JSON.parse(atob(token.split(".")[1]));
    objToken.nameidentifier =
      dataToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    objToken.name =
      dataToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    objToken.rule =
      dataToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    objToken.exp = dataToken.exp;
  }
  return objToken;
};
let setTitle = (title) => {
  document.title = title;
};

export { getDataToken, getScreenSize, setTitle };
