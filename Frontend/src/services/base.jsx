import axios from "axios";

//const baseUrl = "https://localhost:5001/api/";
const baseUrl = "https://api.jtl.app/api/";

const api = axios.create({
  baseURL: baseUrl,
});

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
  "session-token":
    sessionStorage.getItem("sessionToken") ||
    localStorage.getItem("sessionToken"),
};

let get = (url) => {
  return new Promise((resolve, reject) => {
    api
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        let sessionToken = res.headers["session-token"];
        if (sessionToken) sessionStorage.setItem("sessionToken", sessionToken);

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let post = (url, data) => {
  return new Promise((resolve, reject) => {
    api
      .post(url, JSON.stringify(data), {
        headers: headers,
      })
      .then((res) => {
        let sessionToken = res.headers["session-token"];
        if (sessionToken) sessionStorage.setItem("sessionToken", sessionToken);

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let postFiles = (url, file) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("file", file);

    api
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "session-token": sessionStorage.getItem("sessionToken"),
        },
      })
      .then((res) => {
        let sessionToken = res.headers["session-token"];
        if (sessionToken) sessionStorage.setItem("sessionToken", sessionToken);

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//metodo excepcional para chamada da deição do perfil
///////////////////////////////////////////////////////
let putFiles = (url, file, email, id) => {
  const form = new FormData();

  form.append("Photo", file);
  form.append("Id", id);
  form.append("Email", email);

  const options = {
    method: "PUT",
    url: baseUrl + url,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      "session-token": sessionStorage.getItem("sessionToken"),
    },
    data: form,
  };
  axios
    .request(options)
    .then(function (response) {
      window.location.href = "/Perfil";
    })
    .catch(function (error) {
      console.error(error);
    });
};
///////////////////////////////////////////////////////

let put = (url, data) => {
  return new Promise((resolve, reject) => {
    api
      .put(url, data, {
        headers: headers,
      })
      .then((res) => {
        let sessionToken = res.headers["session-token"];
        if (sessionToken) sessionStorage.setItem("sessionToken", sessionToken);

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let destroy = (url, data) => {
  return new Promise((resolve, reject) => {
    api
      .delete(
        url,
        {
          headers: headers,
        },
        JSON.stringify({
          data,
        })
      )
      .then((res) => {
        let sessionToken = res.headers["session-token"];
        if (sessionToken) sessionStorage.setItem("sessionToken", sessionToken);

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { get, post, put, destroy, postFiles, putFiles, baseUrl };
