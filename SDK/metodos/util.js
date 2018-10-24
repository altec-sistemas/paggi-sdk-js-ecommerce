var EnvironmentConfiguration = require("../environmentConfiguration");
var RestClient = require("../restClient");

var makeRequest = (
  classe,
  method,
  bodyParams = [],
  urlParams = [],
  id = "",
  options = ""
) => {
  var configurator = new EnvironmentConfiguration();
  var client = new RestClient();

  var token = configurator.getToken();
  var partnerId = configurator.getPartnerId();
  var environment = configurator.getEnvironment();

  var useMethod = client.setMethod(method);
  var endpoint = client.setEndpoint(classe);
  var body = client.createBody(bodyParams);
  var url = client.mountUrl(
    endpoint,
    environment,
    partnerId,
    id,
    urlParams,
    options
  );
  var headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  var response = client.createRequest(useMethod, url, headers, body);
  return response;
};

module.exports = makeRequest;
