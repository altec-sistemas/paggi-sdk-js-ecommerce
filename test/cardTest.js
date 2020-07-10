var chai = require('chai');
var expect = chai.expect;
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Card", () => {
  var configurator = new Paggi.Environment();
  configurator.setEnvironment("Staging");
  configurator.setToken(token);
  configurator.setPartnerIdByToken(token);
  describe("#create()", () => {
    it("Should return the ID of the created card", async () => {
      const card = await Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        holder: "BRUCE WAYNER",
        document: "16123541090"
      });
      return expect(card.id).to.exist;
    })

    it("Should return errors", async () => {
      const card = await Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        //holder: "BRUCE WAYNER",
        document: "16123541090"
      });
      return expect(card.code).to.be.equals(422);
    })
  });

  describe("#delete()", () => {
    it("Should return status 204", async () => {
      const card = await Paggi.Card.create({
        cvv: "123",
        year: "2022",
        number: "4123200700046446",
        month: "09",
        holder: "BRUCE WAYNER",
        document: "16123541090"
      });
      const response = await Paggi.Card.del(card.id);
      return expect(response.code).to.equal(204);
    })

    it("Should return errors when deleting", async () => {
      const response = await Paggi.Card.del("111111");
      return expect(response.code).to.be.equals(400);
    })
  });
});
