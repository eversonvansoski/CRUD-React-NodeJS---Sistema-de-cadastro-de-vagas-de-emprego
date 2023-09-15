import { get, post } from "./_base";

let auth = (userName, password, keepLoggedIn) => {
  let body = {
    userName: userName,
    password: password,
    keepLoggedIn: keepLoggedIn,
  };
  return post("/Auth/login", body);
};

let refreshToken = (accessToken, refreshToken, keepLoggedIn) => {
  let body = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    keepLoggedIn: keepLoggedIn,
  };
  return post("/Token/refresh", body);
};

let logout = () => {
  return get("/Auth/Logout");
};

export { auth, logout, refreshToken };
