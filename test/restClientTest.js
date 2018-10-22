var chai = require("chai");
var RestClient = require("../SDK/restClient");
var EnvConfiguration = require("../SDK/environmentConfiguration");

var token = process.env.TOKEN;

describe("Rest Client", () => {
  describe("#setMethod", () => {
    it("Should return the method if the method is successfully set. In this case, GET", () => {
      var client = new RestClient();
      chai.assert.equal(client.setMethod("get"), "GET");
    });
    it("Should return 'metodo não suportado' if method is not successfully set", () => {
      var client = new RestClient();
      chai.assert.equal(client.setMethod("aa"), "metodo não suportado");
    });
  });

  describe("#setEndpoint", () => {
    it("Should return the endpoint who was set.", () => {
      var client = new RestClient();
      chai.assert.equal(client.setEndpoint("cards"), "/cards");
    });
  });

  describe("#createBody", () => {
    it("Should return the body for the request.", () => {
      var client = new RestClient();
      var body = { teste: "aaa" };
      chai.assert.equal(client.createBody(body).teste, "aaa");
    });
  });

  describe("#mountUrl", () => {
    it("Should return the URL for the request.", () => {
      var url;
      var client = new RestClient();
      var env = new EnvConfiguration();
      env.setEnvironment("Staging");
      env.setPartnerIdByToken(token);
      env.setToken(token);
      url = `https://api.paggi.com/v1/partners/${env.getPartnerId()}/cards`;
      chai.assert.equal(
        client.mountUrl("cards", "Staging", env.getPartnerId(), "", [], ""),
        url
      );
    });
  });

  describe("#createRequest", () => {
    it("should return the response from the request with status 200", () => {
      var client = new RestClient();
      var response = client.createRequest(
        "GET",
        `https://api.paggi.com/v1/banks`,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      );
      chai.assert.equal(response.status, 200);
    });
  });
});
