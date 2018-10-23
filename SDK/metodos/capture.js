var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var capture = (classe, id, body = []) => {
  response = makeRequest(classe, "PUT", body, [], id, "/capture");
  return manageResponse(response);
};

module.exports = capture;
