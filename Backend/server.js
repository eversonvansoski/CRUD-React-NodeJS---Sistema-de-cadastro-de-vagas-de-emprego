const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const http = require("http");

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

routes(app);

var serverHttp = http.createServer(app);

serverHttp.listen(6000, () => {
  console.log(`app rodando na porta 6000`);
});
