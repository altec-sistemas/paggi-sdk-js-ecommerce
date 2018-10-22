var jwtDecode = require("jwt-decode");
var TokenValidation = require("./tokenValidation");

var validator = new TokenValidation();

function EnvironmentConfiguration() {
  // var token = "";
  // var partnerId = "";
  // var environment = "";
}

EnvironmentConfiguration.token = "";

EnvironmentConfiguration.partnerId = "";

EnvironmentConfiguration.environment = "";

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
  if (typeof this.token !== "undefined") {
    return this.token;
  }
  return "Erro, Token não configurado";
};

EnvironmentConfiguration.prototype.getEnvironment = () => {
  if (typeof this.environment !== "undefined") {
    return this.environment;
  }
  return "Erro, ambiente não configurado";
};

EnvironmentConfiguration.prototype.getPartnerId = () => {
  if (typeof this.partnerId !== "undefined") {
    return this.partnerId;
  }
  return "Erro, partnerID não configurado";
};
module.exports = EnvironmentConfiguration;
