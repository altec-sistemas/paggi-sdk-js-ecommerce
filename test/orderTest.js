var chai = require('chai');
var expect = chai.expect;
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Order", () => {
  var configurator = new Paggi.Environment();
  configurator.setEnvironment("Staging");
  configurator.setToken(token);
  configurator.setPartnerIdByToken(token);
  describe("#create()", () => {

    it("Should return the order with 'captured' in status", () => {
      return Promise.resolve(Paggi.Order.create({
        capture: true,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 1,
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
      })).then((order) => expect(order.status).to.be.equal("captured"))
    });

    it("Should return the order with 'authorized' in status", () => {
      return Promise.resolve(Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 1,
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
      })).then((order) => expect(order.status).to.be.equal("authorized"));
    });

    it("Expect to return 'captured' in a order previous authorized", () => {
      return Promise.resolve(Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 1,
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
      }))
        .then((order) => Promise.resolve(Paggi.Order.capture(order.id))
          .then((response) => {
            console.log(response)
            return expect(response.status).to.be.equal("captured")
          }))
    });

    it("Should return errors in creation", () => {
      return Promise.resolve(Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            installments: 10,
            card: {
              number: "5573710095684403",
              cvc: "123",
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
      })).then((order) => { expect(order.code).to.be.equal(422) })
    });
  });

  describe("#cancel()", () => {
    it("Should return 204", () => {
      return Promise.resolve(Paggi.Order.create({
        capture: false,
        ip: "66.249.64.60",
        external_identifier: "ABC123",
        charges: [
          {
            amount: 5000,
            installments: 1,
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
      }))
        .then((order) => Promise.resolve(Paggi.Order.cancel(order.id))
          .then((response) => expect(response.status == "cancelled").to.be.true))
    });
    it("Should return errors when try to delete", () => {
      return Promise.resolve(Paggi.Order.cancel("111111"))
        .then((order) => expect(order.code).to.be.equal(400))
    });
  });
});
