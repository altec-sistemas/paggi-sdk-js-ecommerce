var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var del = (classe, id) => {
  response = makeRequest(classe, "DELETE", [], [], id);
  return manageResponse(response);
};

module.exports = del;
