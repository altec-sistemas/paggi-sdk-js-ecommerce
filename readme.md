# Paggi JS SDK - Ecommerce

Utilize este SDK para realizar a integração com nossa API de ecommerce.

## Instalação

```sh
npm install paggi/sdk-ecommerce
```

## Utilização

### Cartões:

```js
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");
$target = new \Paggi\SDK\Card();
var configurator = new EnvConfiguration();
configurator.setEnvironment("Staging");
configurator.setToken(token);
configurator.setPartnerIdByToken(token);
var cartao = Paggi.Card.create({
cvv: "123",
year: "2022",
number: "4123200700046446",
month: "09",
holder: "BRUCE WAYNER",
document: "16123541090"
});
```

### Pedidos

```js
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");
var token = process.env.TOKEN;
var configurator = new EnvConfiguration();
configurator.setEnvironment("Staging");
configurator.setToken(token);
configurator.setPartnerIdByToken(token);
var order = Paggi.Order.create({
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
});
```

### Bancos

```js
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");
var token = process.env.TOKEN;
var configurator = new EnvConfiguration();
configurator.setEnvironment("Staging");
configurator.setToken(token);
configurator.setPartnerIdByToken(token);
var bancos = Paggi.Bank.find();
chai.assert.exists(bancos);
```

### Mais informações

PAra mais informação, você pode conferir nossa documentação [aqui](https://developers.paggi.com/).
