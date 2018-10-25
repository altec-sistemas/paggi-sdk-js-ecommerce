var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var cancel = (classe, id) => {
  response = makeRequest(classe, "PUT", [], [], id, "/void");
  return manageResponse(response);
};

module.exports = cancel;
