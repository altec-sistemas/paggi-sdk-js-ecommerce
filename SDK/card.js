var creator = require("./metodos/create");
var deleter = require("./metodos/delete");
var finder = require("./metodos/find");

module.exports = {
  create: params => creator("cards", params),
  del: id => deleter("cards", id),
  find: document => finder("cards", document)
};
