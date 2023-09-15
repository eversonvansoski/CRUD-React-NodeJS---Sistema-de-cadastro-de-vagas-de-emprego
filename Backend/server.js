const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");

const cors = require("cors");
const whitelist = ["http://localhost:4000", "https://localhost:4001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      //callback(new Error("Erro no front"));
    }
  },
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

routes(app);
let keyPath = "./security/cert.key";
let certPath = "./security/cert.pem";
const HttpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

var serverHttp = http.createServer(app);
var serverHttps = https.createServer(HttpsOptions, app);

serverHttp.listen(6000, () => {
  console.log(`app rodando na porta 6000`);
});
serverHttps.listen(6001, () => {
  console.log(`app rodando na porta 6001`);
});
