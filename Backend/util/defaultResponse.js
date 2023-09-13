const defaultResponse = function(success, msg) {
  const json = '{"success":' + success + ', "msg":"' + msg + '"}';
  return JSON.parse(json);
};

module.exports = defaultResponse;
