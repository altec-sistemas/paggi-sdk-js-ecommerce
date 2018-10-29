var chai = require("chai");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Bank", () => {
  describe("#find()", () => {
    it("Should return a list of banks", () => {
      var configurator = new Paggi.Environment();
      var banks;
      configurator.setEnvironment("Staging");
      configurator.setToken(token);
      configurator.setPartnerIdByToken(token);
      banks = Paggi.Bank.find();
      chai.assert.exists(banks);
    });
  });
});
