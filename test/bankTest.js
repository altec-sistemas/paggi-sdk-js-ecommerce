var chai = require("chai");
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Bank", () => {
  describe("#find()", () => {
    it("Should return a list of banks", () => {
      var configurator = new EnvConfiguration();
      var bancos;
      configurator.setEnvironment("Staging");
      configurator.setToken(token);
      configurator.setPartnerIdByToken(token);
      bancos = Paggi.Bank.find();
      chai.assert.exists(bancos);
    }).timeout(5000);
  });
});
