var chai = require("chai");
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Bank", () => {
  describe("#find()", () => {
    it("Should return a list of banks", () => {
      var configurator = new EnvConfiguration();
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            configurator.setEnvironment("Staging"),
            configurator.setToken(token),
            configurator.setPartnerIdByToken(token),
            Paggi.Bank.find()
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.exists(obj);
      });
    });
  });
});
