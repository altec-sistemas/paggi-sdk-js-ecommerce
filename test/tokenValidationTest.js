const chai = require("chai");
const TokenValidate = require("../SDK/tokenValidation");
const TokenValidator = new TokenValidate();

const token = process.env.TOKEN;
const invalidToken = process.env.INVALIDTOKEN;
const expiredToken = process.env.EXPIREDTOKEN;
const expiringToken = process.env.EXPIRINGTOKEN;

describe("Token Validation", () => {
  describe("#isValid()", () => {
    it("Should return true if token is valid", () => {
      const valid = TokenValidator.isValid(token);
      chai.assert.isTrue(valid);
    });
    it("Should return false if token is invalid", () => {
      const valid = TokenValidator.isValid(invalidToken);
      chai.assert.isFalse(valid);
    });
  });

  describe("#isExpired()", () => {
    it("Should return true if token is expired", () => {
      chai.assert.isTrue(TokenValidator.isExpired(expiredToken));
    });
    it("Should return false if token is not expired", () => {
      chai.assert.isFalse(TokenValidator.isExpired(token));
    });
  });

  describe("#isExpiring()", () => {
    it("Should return true if token has less than one month to expire.", () => {
      chai.assert.isTrue(TokenValidator.isExpiring(expiringToken));
    });
    it("Should return false if token has more than one month to expire", () => {
      chai.assert.isFalse(TokenValidator.isExpiring(token));
    });
  });
});
