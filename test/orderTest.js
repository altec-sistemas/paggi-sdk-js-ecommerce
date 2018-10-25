var chai = require("chai");
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Order", () => {
  var configurator = new EnvConfiguration();
  configurator.setEnvironment("Staging");
  configurator.setToken(token);
  configurator.setPartnerIdByToken(token);
  describe("#create()", () => {
    it("Should return the order with 'captured' in status", () => {
      var order = Paggi.Order.create({
        capture: true,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
              holder: "BRUCE WAYNE",
              year: "2020",
              month: "04",
              document: "86219425006"
            }
          }
        ],
        customer: {
          name: "Bruce Wayne",
          document: "86219425006",
          email: "bruce@waynecorp.com"
        }
      });
      chai.assert.equals(order.status, "captured");
    }).timeout(3000);
    it("Should return the order with 'authorized' in status", () => {
      var order = Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
              holder: "BRUCE WAYNE",
              year: "2020",
              month: "04",
              document: "86219425006"
            }
          }
        ],
        customer: {
          name: "Bruce Wayne",
          document: "86219425006",
          email: "bruce@waynecorp.com"
        }
      });
      chai.assert.exists(order.status, "authorized");
    }).timeout(3000);
    it("Should return the order with 'captured' in status of the order not captured", () => {
      var order = Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
              holder: "BRUCE WAYNE",
              year: "2020",
              month: "04",
              document: "86219425006"
            }
          }
        ],
        customer: {
          name: "Bruce Wayne",
          document: "86219425006",
          email: "bruce@waynecorp.com"
        }
      });
      order = Paggi.Order.capture(order.id);
      chai.assert.exists(order.status, "captured");
    }).timeout(3000);
    it("Should return errors", () => {
      var order = Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
              holder: "BRUCE WAYNE",
              year: "2020",
              month: "04",
              document: "86219425006"
            }
          }
        ],
        customer: {
          name: "Bruce Wayne",
          document: "86219425006",
          email: "bruce@waynecorp.com"
        }
      });
      chai.assert.exists(order.errors);
    }).timeout(3000);
  });
  describe("#cancel()", () => {
    it("Should return status canceled", () => {
      var order = Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
              holder: "BRUCE WAYNE",
              year: "2020",
              month: "04",
              document: "86219425006"
            }
          }
        ],
        customer: {
          name: "Bruce Wayne",
          document: "86219425006",
          email: "bruce@waynecorp.com"
        }
      });
      order = Paggi.Order.cancel(order.id);
      chai.assert.equal(order.status, "canceled");
    }).timeout(3000);
    it("Should return errors", () => {
      var order = Paggi.Order.cancel("111111");
      chai.assert.exists(order.errors);
    });
  });
});
