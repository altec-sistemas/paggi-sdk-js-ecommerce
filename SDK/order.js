var creator = require("./metodos/create");
var canceler = require("./metodos/cancel");
var capturer = require("./metodos/capture");

module.exports = {
  create: params => creator("orders", params),
  capture: (id, body = []) => capturer("orders", id, body),
  cancel: id => canceler("orders", id)
};
