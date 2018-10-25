var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function RestClient() {}

RestClient.prototype.setMethod = method => {
  var methods = ["GET", "POST", "PUT", "DELETE"];
  if (methods.indexOf(method.toUpperCase()) > -1) {
    return method.toUpperCase();
  }
  return "metodo não suportado";
};

RestClient.prototype.setEndpoint = classe => `/${classe}`;

RestClient.prototype.createBody = body => body;

RestClient.prototype.mountUrl = (
  endpoint,
  environment,
  partnerId,
  objectId = "",
  params = [],
  options = ""
) => {
  var parameters = "";
  var urlPreffix = "https://api-ecommerce.";
  var urlSuffix = "paggi.com/v1";
  var url = urlPreffix + (environment === "Staging" ? "stg." : "");
  url += urlSuffix;
  if (!endpoint.localeCompare("/banks")) {
    return `${url}/banks`;
  }
  url += "/partners/";
  url += partnerId;
  url += `${endpoint}`;
  url += objectId === "" ? "" : `/${objectId}`;
  url += options;
  if (options !== "") {
    url += "?";
    Object.keys(params).forEach(key => {
      parameters += `${key}=${params[key]}`;
      parameters += "&";
    });
    url += parameters.substring(0, parameters.length - 1);
  }
  return url;
};

RestClient.prototype.createRequest = (method, url, headers = {}, body = []) => {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url, false);
  Object.keys(headers).forEach(key => {
    xhttp.setRequestHeader(key, headers[key]);
  });
  xhttp.send(JSON.stringify(body));
  return xhttp;
};

module.exports = RestClient;
