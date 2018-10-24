var responseManagement = responseRequest => {
  var code = responseRequest.status;
  var response;
  switch (code) {
    case 200:
    case 201:
      response = JSON.parse(responseRequest.responseText);
      return response;
    case 204:
      return { code: responseRequest.status, Mensagem: "Deletado com sucesso" };
    default:
      return JSON.parse(responseRequest.responseText);
  }
};

module.exports = responseManagement;
