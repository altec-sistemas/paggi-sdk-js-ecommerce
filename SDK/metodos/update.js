var makeRequest = require("./util");
var manageResponse = require("./responseManagement");

var del = (classe, params, objectId) => {
    response = makeRequest(classe, "UPDATE", params, [], objectId);
    return manageResponse(response);
};

module.exports = del;
