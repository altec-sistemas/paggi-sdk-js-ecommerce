var chai = require("chai");
var TokenValidate = require("../SDK/tokenValidation");

var token = process.env.TOKEN;
var invalidToken = process.env.INVALIDTOKEN;
var expiredToken = process.env.EXPIREDTOKEN;
var expiringToken = process.env.EXPIRINGTOKEN;

describe("Token Validation", () => {
  describe("#isValid()", () => {
    it("Should return true if token is valid", () => {
      var TokenValidator = new TokenValidate();
      var valid = TokenValidator.isValid(token);
      chai.assert.isTrue(valid);
    });
    it("Should return false if token is invalid", () => {
      var TokenValidator = new TokenValidate();
      var valid = TokenValidator.isValid(invalidToken);
      chai.assert.isFalse(valid);
    });
  });

  describe("#isExpired()", () => {
    it("Should return true if token is expired", () => {
      var TokenValidator = new TokenValidate();
      chai.assert.isTrue(TokenValidator.isExpired(expiredToken));
    });
    it("Should return false if token is not expired", () => {
      var TokenValidator = new TokenValidate();
      chai.assert.isFalse(TokenValidator.isExpired(token));
    });
  });

  describe("#isExpiring()", () => {
    it("Should return true if token has less than one month to expire.", () => {
      var TokenValidator = new TokenValidate();
      chai.assert.isTrue(TokenValidator.isExpiring(expiringToken));
    });
    it("Should return false if token has more than one month to expire", () => {
      var TokenValidator = new TokenValidate();
      chai.assert.isFalse(TokenValidator.isExpiring(token));
    });
  });
});
