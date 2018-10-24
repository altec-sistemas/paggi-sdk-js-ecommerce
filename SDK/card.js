var creator = require("./metodos/create");
var deleter = require("./metodos/delete");

module.exports = {
  create: params => creator("cards", params),
  del: id => deleter("cards", id)
};
