const chai = require("chai");
const TokenValidation = require("../SDK/tokenValidation");

const token = process.env.TOKEN;
const invalidToken = process.env.INVALIDTOKEN;
const expiredToken = process.env.EXPIREDTOKEN;
const expiringToken = process.env.EXPIRINGTOKEN;

/* global describe it */
describe("Token Validation", () => {
  describe("#isValid()", () => {
    it("Should return true if token is valid", () => {
      chai.assert.isTrue(TokenValidation.isValid(token));
    });
    it("Should return false if token is invalid", () => {
      chai.assert.isTrue(TokenValidation.isValid(invalidToken));
    });
  });

  describe("#isExpired()", () => {
    it("Should return true if token is expired", () => {
      chai.assert.isTrue(TokenValidation.isExpired(expiredToken));
    });
    it("Should return false if token is not expired", () => {
      chai.assert.isTrue(TokenValidation.isExpired(token));
    });
  });

  describe("#isExpiring()", () => {
    it("Should return true if token has less than one month to expire.", () => {
      chai.assert.isTrue(TokenValidation.isExpiring(expiringToken));
    });
    it("Should return false if token has more than one month to expire", () => {
      chai.assert.isTrue(TokenValidation.isExpiring(token));
    });
  });
});
