var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var find = (classe, id, urlParams = []) => {
  var response;
  if (typeof id === "string") {
    response = makeRequest(classe, "GET", [], urlParams, id);
    return manageResponse(response);
  }
  response = makeRequest(classe, "GET", [], urlParams);
  return manageResponse(response);
};

module.exports = find;
