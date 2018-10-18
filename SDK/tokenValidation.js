const jwtDecode = require("jwt-decode");

const TokenValidation = {}; // C Object simplifies exporting the module

TokenValidation.isValid = token => {
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
};

TokenValidation.isExpired = token => {
  const decodedToken = jwtDecode(token);
  const date = new Date(decodedToken.exp);
  todayDate = new Date().valueOf() / 1000;
  return +date < +todayDate;
};

TokenValidation.isExpiring = token => {
  const decodedToken = jwtDecode(token);
  const date = new Date(decodedToken.exp * 1000);
  todayDate = new Date().valueOf();
  return +todayDate > +date - 2592000;
};
module.exports = TokenValidation;
