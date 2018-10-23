var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var create = (classe, params) => {
  response = makeRequest(classe, "POST", params);
  return manageResponse(response);
};

module.exports = create;
