var chai = require("chai");
var Environment = require("../SDK/environmentConfiguration");

var token = process.env.TOKEN;
var invalidToken = process.env.INVALIDTOKEN;
var expiredToken = process.env.EXPIREDTOKEN;
var partnerID = process.env.PARTNERID;

describe("Environment Configuration", () => {
  describe("#setToken", () => {
    it("Should return true if token has been set successfully", () => {
      var Configurator = new Environment();
      chai.assert.isTrue(Configurator.setToken(token));
    });
    it("Should return false if token has not been set successfully", () => {
      var Configurator = new Environment();
      chai.assert.isFalse(Configurator.setToken(invalidToken));
    });
  });

  describe("#setEnvironment", () => {
    it("Should return true if environment is correct set. to Staging", () => {
      var Configurator = new Environment();
      chai.assert.isTrue(Configurator.setEnvironment("Staging"));
    });
    it("Should return true if the environment is correct set to Production", () => {
      var Configurator = new Environment();
      chai.assert.isTrue(Configurator.setEnvironment("Prod"));
    });
    it("Should return false, because we use something that our API don't have configured.", () => {
      var Configurator = new Environment();
      chai.assert.isFalse(Configurator.setEnvironment("aaa"));
    });
  });

  describe("#setPartnerIdByToken", () => {
    it("Should return the true if the partner_id is correctly set", () => {
      var Configurator = new Environment();
      chai.assert.isTrue(Configurator.setPartnerIdByToken(token));
    });
    it("Should return the false if the partner_id is incorrectly set", () => {
      var Configurator = new Environment();
      chai.assert.isFalse(Configurator.setPartnerIdByToken(invalidToken));
    });
    it("Should return the false if the partner_id is incorrectly set with a expired token", () => {
      var Configurator = new Environment();
      chai.assert.isFalse(Configurator.setPartnerIdByToken(expiredToken));
    });
  });

  describe("#getToken", () => {
    it("Should return the token seted", () => {
      var Configurator = new Environment();
      Configurator.setToken(token);
      chai.assert.equal(Configurator.getToken(), token);
    });
    /*    it("Should return 'Erro, Token não configurado'", () => {
      var Configurator = new Environment();
      chai.assert.equal(Configurator.getToken(), "Erro, Token não configurado");
    }); */
  });
  describe("#getEnvironment", () => {
    it("Should return 'Staging'", () => {
      var Configurator = new Environment();
      Configurator.setEnvironment("Staging");
      chai.assert.equal(Configurator.getEnvironment(), "Staging");
    });
    it("Should return 'Prod'", () => {
      var Configurator = new Environment();
      Configurator.setEnvironment("Prod");
      chai.assert.equal(Configurator.getEnvironment(), "Prod");
    });
    /* it("Should return 'Erro, ambiente não configurado'", () => {
      var Configurator = new Environment();
      chai.assert.equal(
        Configurator.getEnvironment(),
        "Erro, ambiente não configurado"
      );
    }); */
  });

  describe("#getPartnerId", () => {
    it("Should return the partnerID seted", () => {
      var Configurator = new Environment();
      Configurator.setPartnerIdByToken(token);
      chai.assert.equal(Configurator.getPartnerId(), partnerID);
    });
    /*it("Should return 'Erro, partnerID não configurado'", () => {
      var Configurator = new Environment();
      chai.assert.equal(
        Configurator.getPartnerId(),
        "Erro, partnerID não configurado"
      );
    }); */
  });
});
