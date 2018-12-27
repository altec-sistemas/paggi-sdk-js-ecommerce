var creator = require("./metodos/create");
var finder = require("./metodos/find");
var updater = require("./metodos/update");
var canceler = require("./metodos/cancel");

module.exports = {
  create: params => creator("subscriptions", params),
  find: (id) => finder("subscriptions", id),
  update: (id, params) => updater("subscriptions", params, id),
  cancel: id => canceler("subscriptions", id)
};
