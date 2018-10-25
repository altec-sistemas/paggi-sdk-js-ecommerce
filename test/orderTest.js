var chai = require("chai");
var Paggi = require("../SDK/paggi");

var token = process.env.TOKEN;

describe("Order", () => {
  var configurator = new Paggi.Environment();
  configurator.setEnvironment("Staging");
  configurator.setToken(token);
  configurator.setPartnerIdByToken(token);
  describe("#create()", () => {
    it("Should return the order with 'captured' in status", () => {
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            Paggi.Order.create({
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
            })
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.equal(obj.status, "captured");
      });
    });
    it("Should return the order with 'authorized' in status", () => {
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            Paggi.Order.create({
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
            })
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.exists(obj.status, "authorized");
      });
    });
    it("Should return the order with 'captured' in status of the order not captured", () => {
      var order;
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            (order = Paggi.Order.create({
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
            })),
            (order = Paggi.Order.capture(order.id))
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.exists(obj.status, "captured");
      });
    });
    it("Should return errors in creation", () => {
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            Paggi.Order.create({
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
            })
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.exists(obj.errors);
      });
    });
  });
  describe("#cancel()", () => {
    it("Should return status canceled", () => {
      var order;
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(
            (order = Paggi.Order.create({
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
            })),
            (order = Paggi.Order.cancel(order.id))
          );
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.equal(obj.status, "canceled");
      });
    });
    it("Should return errors when try to delete", () => {
      var promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(Paggi.Order.cancel("111111"));
        }, 5000);
      });
      promise.then(obj => {
        chai.assert.exists(obj.errors);
      });
    });
  });
});
