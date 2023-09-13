const regEx = function (validate, str) {
  var regEx = "";
  switch (validate) {
    case "username":
      regEx = /^[a-z0-9._-]{3,16}$/;
      break;
    case "email":
      regEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case "password":
      regEx =
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/;
      break;
  }
  return regEx.test(str);
};

module.exports = regEx;
