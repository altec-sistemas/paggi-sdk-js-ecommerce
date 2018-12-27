var creator = require("./metodos/create");
var finder = require("./metodos/find");
var updater = require("./metodos/update");

module.exports = {
  create: params => creator("recipients", params),
  find: (id) => finder("recipients", id),
  update: (id, params) => updater("recipients", params, id)
};
