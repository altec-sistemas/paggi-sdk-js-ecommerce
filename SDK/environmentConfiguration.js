var jwtDecode = require("jwt-decode");
var TokenValidation = require("./tokenValidation");

var validator = new TokenValidation();

function EnvironmentConfiguration() {
  var token = "";
  var partnerId = "";
  var environment = "";
}

EnvironmentConfiguration.prototype.setToken = token => {
  if (validator.isValid(token) && !validator.isExpired(token)) {
    this.token = token;
    return true;
  }
  return false;
};

EnvironmentConfiguration.prototype.setEnvironment = env => {
  var environments = ["Prod", "Staging"];
  if (environments.indexOf(env) > -1) {
    this.environment = env;
    return true;
  }
  return false;
};

EnvironmentConfiguration.prototype.setPartnerIdByToken = token => {
  var decoded;
  if (validator.isValid(token) && !validator.isExpired(token)) {
    decoded = jwtDecode(token);
    this.partnerId = decoded.permissions[0].partner_id;
    return true;
  }
  return false;
};

EnvironmentConfiguration.prototype.getToken = () => {
  if (typeof this.token !== "undefined" && this.token !== "") {
    return this.token;
  }
  return "Erro, Token não configurado";
};

EnvironmentConfiguration.prototype.getEnvironment = () => {
  if (typeof this.environment !== "undefined" && this.token !== "") {
    return this.environment;
  }
  return "Erro, ambiente não configurado";
};

EnvironmentConfiguration.prototype.getPartnerId = () => {
  if (typeof this.partnerId !== "undefined" && this.token !== "") {
    return this.partnerId;
  }
  return "Erro, partnerID não configurado";
};

EnvironmentConfiguration.prototype.reset = () => {
  this.token = "";
  this.environment = "";
  this.partnerId = "";
};

module.exports = EnvironmentConfiguration;
