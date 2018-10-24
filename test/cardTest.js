var chai = require("chai");
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Card", () => {
  var configurator = new EnvConfiguration();
  configurator.setEnvironment("Staging");
  configurator.setToken(token);
  configurator.setPartnerIdByToken(token);
  describe("#create()", () => {
    it("Should return the ID of the created card", () => {
      var cartao = Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        holder: "BRUCE WAYNER",
        document: "16123541090"
      });
      chai.assert.exists(cartao.id);
    });
    it("Should return errors", () => {
      var cartao = Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        holder: "BRUCE WAYNER",
        document: ""
      });
      chai.assert.exists(cartao.errors);
    });
  });
  describe("#delete()", () => {
    it("Should return status 204", () => {
      var cartao = Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        holder: "BRUCE WAYNER",
        document: "16123541090"
      });
      cartao = Paggi.Card.del(cartao.id);
      chai.assert.equal(cartao.code, 204);
    });
    it("Should return errors", () => {
      var cartao = Paggi.Card.del("111111");
      chai.assert.exists(cartao.errors);
    });
  });
});
