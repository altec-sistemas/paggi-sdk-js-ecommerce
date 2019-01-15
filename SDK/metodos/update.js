var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var del = (classe, params, objectId) => {
  response = makeRequest(classe, "PUT", params, [], objectId);
  return manageResponse(response);
};

module.exports = del;
