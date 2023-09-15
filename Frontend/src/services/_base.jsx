import axios from "axios";

const baseUrl = "https://localhost:6001/";

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

export { get, post, put, destroy, postFiles, baseUrl };
