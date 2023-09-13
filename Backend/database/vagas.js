const db = require("../util/db");

const listarVagas = async function () {
  return new Promise((resolve) => {
    db.connection.query("select * from vagas", function (err, response) {
      if (err) throw err;
      resolve(response);
    });
  });
};

module.exports = {
  listarVagas,
};
