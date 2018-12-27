var responseManagement = responseRequest => {
  var code = responseRequest.status;
  var response;
  switch (code) {
    case 200:
    case 201:
      response = JSON.parse(responseRequest.responseText);
      return response;
    case 204:
      return { code: code, message: "Deletado com sucesso" };
    case 400:
      return {
        code: code,
        message: "Request mal formatada"
      };
    case 401:
      return {
        code: code,
        message: "Token inválido"
      };
    case 402:
      return {
        code: code,
        message: "Uma ou mais cobranças foram negadas"
      };
    case 404:
      return {
        code: code,
        message: "Objeto não encontrado"
      };
    case 422:
      return {
        code: code,
        message: "Paramêtro inválido"
      };
    case 500:
      return {
        code: code,
        message: "Ocorreu algum erro na aplicação da API da Paggi"
      };
    case 501:
      return {
        code: code,
        message:
          "O método HTTP que você usou não é implementado para o recurso solicitado"
      };
    case 502:
      return {
        code: code,
        message: "Ocorreu um erro na infraestrutura da Paggi"
      };
    case 503:
      return {
        code: code,
        message: "Ocorreu um erro na infraestrutura da Paggi"
      };
    default:
      return JSON.parse(responseRequest.responseText);
  }
};

module.exports = responseManagement;
