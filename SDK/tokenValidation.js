const jwtDecode = require("jwt-decode");

function TokenValidation() {
  helper = (token, subtract) => {
    const decodedToken = jwtDecode(token);
    const date = new Date(decodedToken.exp);
    todayDate = new Date().valueOf() / 1000;
    return +todayDate > +date - subtract;
  };
}

TokenValidation.prototype.isValid = token => {
  var isPartnerSet;
  var decodedToken;
  try {
    decodedToken = jwtDecode(token);
    isPartnerSet =
      typeof decodedToken.permissions[0].partner_id !== "undefined";
  } catch (err) {
    isPartnerSet = false;
  } finally {
    return isPartnerSet;
  }
};

TokenValidation.prototype.isExpired = token => helper(token, 0);

TokenValidation.prototype.isExpiring = token => helper(token, 2592000);

module.exports = TokenValidation;

/*
class TokenValidation {
  isValid(token) {
    let isPartnerSet;
    try {
      const decodedToken = jwtDecode(token);
      isPartnerSet =
        typeof decodedToken.permissions[0].partner_id !== "undefined";
    } catch (err) {
      isPartnerSet = false;
    } finally {
      return isPartnerSet;
    }
  }

  isExpired(token) {
    return this.helper(token, 0);
  }

  isExpiring(token) {
    return this.helper(token, 2592000);
  }

  helper(token, subtract) {
    const decodedToken = jwtDecode(token);
    const date = new Date(decodedToken.exp);
    const todayDate = new Date().valueOf() / 1000;
    return +todayDate > +date - subtract;
  }
}
*/
