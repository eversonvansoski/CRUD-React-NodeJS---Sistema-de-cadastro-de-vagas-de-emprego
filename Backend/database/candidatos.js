const db = require("../util/db");

const listarCandidatos = async function () {
  return new Promise((resolve) => {
    db.connection.query("select * from candidatos", function (err, response) {
      if (err) throw err;
      resolve(response);
    });
  });
};

module.exports = {
  listarVagas,
};
