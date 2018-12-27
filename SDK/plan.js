var creator = require("./metodos/create");
var finder = require("./metodos/find");
var updater = require("./metodos/update");
var deleter = require("./metodos/delete");

module.exports = {
  create: params => creator("plans", params),
  find: (id) => finder("plans", id),
  update: (id, params) => updater("plans", params, id),
  delete: id => deleter("plans", id)
};
