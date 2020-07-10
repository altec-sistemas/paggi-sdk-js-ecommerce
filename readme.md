# Paggi JS SDK - Ecommerce

Utilize este SDK para realizar a integração com nossa API de ecommerce.

## Instalação

```sh
npm install paggi-js
```

## Configuração de Ambiente

```js
var EnvConfiguration = require("../SDK/environmentConfiguration");
var Paggi = require("../SDK/paggi");
var configurator = new EnvConfiguration();
configurator.setEnvironment("Staging");
configurator.setToken(token);
configurator.setPartnerIdByToken(token);
```

## Utilização

### Cartões:

```js

> Criar cartão:

var request = Paggi.Card.create({
  cvv: "123",
  year: "2022",
  number: "4123200700046446",
  month: "09",
  holder: "BRUCE WAYNER",
  document: "16123541090"
});


> Consultar cartão: 

var request = Paggi.Card.Find({
  document: "16123541090"
});


> Deletar cartão:

var card_id = "7268b105-00a9-4cbf-8946-c3d573520372"

var request = Paggi.Card.Delete(card_id);
```

### Pedidos

```js

> Criar pagamento:

var request = Paggi.Order.create({
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

> Cancelar pagamento:

var order_id = "ffe22540-ebf2-4415-92af-56b2cf80bf9e"

var request = Paggi.Order.cancel(order_id)
```

### Recebedores

O campo `account_type` pode ser:

- CONTA_CORRENTE
- CONTA_POUPANCA
- CONTA_FACIL
- ENTIDADE_PUBLICA

``` js

> Criar recebedor:

var request = Paggi.Recipient.create({
    name: "BRUCE WAYNER",
    document: "78945612389",
      bank_account: { 
        bank_code: "077",
        branch_number: "0001",
        branch_digit: "5",
        account_number: "120003",
        account_digit: "4",
        account_holder_name: "BRUCE WAYNE"
        account_type: "CONTA_CORRENTE"
    }}
);

> Buscar Recebedor:

var request = Paggi.Recipient.find()

> Atualizar Recebedor:

var request = Paggi.Recipient.create({
    name: "BRUCE WAYNER",
    document: "78945612389",
      bank_account: { 
        bank_code: "077",
        branch_number: "0123",
        branch_digit: "4",
        account_number: "330233",
        account_digit: "7",
        account_holder_name: "BRUCE WAYNE"
        account_type: "CONTA_CORRENTE"
    }}
);

```

### Bancos

```js

var bancos = Paggi.Bank.find([start: 0, count: 20]);
```

### Planos / Assinaturas


Para criar uma assinatura é necessário um plano existente.
O Plano controla o valor, intervalo entre pagamentos, duração, período de teste da assinatura.
A Assinatura é responsável pelo pagamento, assim como desconto e preços adicionais se necessário.

```js

> Criar plano:

var request = Paggi.Plan.create({
  name: "Primeiro plano,
  price: 1990,
  interval: "1m",
  trial_period: "2d",
  external_identifier: "12345",
  description: "Teste"
  }
);


> Criar assinatura: 

var request = Paggi.Subscriptions.create({
  external_identifier:  "12345",
  plan_id: "7f42a0a0-6ae8-4a57-a340-a8c4867771eb",
  ip:  "8.8.8.8",
  customer: {
    name: "Bruce Wayne",
    document: "16223541090",
    email: "bruce@waynecorp.com"    
  },
  card: {
    cvc: "123",
    year: "2020",
    month: "01",
    number: "4485200700046446",
    holder: "BRUCE WAYNER",
    document: "16223541090"
  }
  discount: {
    {
      period: 2,
      description: "Teste Desconto",
      amount: 1000
    }
  },
  additional: {
    {
      period: 3,
      description: "Teste adicionais",
      amount: 2000
    }
  }
})


> Consultar plano:

var plan = Paggi.Plan.find({plan_id: "7f42a0a0-6ae8-4a57-a340-a8c4867771eb"});


> Atualizar plano:

var plan_id =  "7f42a0a0-6ae8-4a57-a340-a8c4867771eb"

var request = Paggi.Plan.update({price: 2990}, plan_id});


> Cancelar plano:

var plan_id =  "7f42a0a0-6ae8-4a57-a340-a8c4867771eb"

var request = Paggi.Plan.delete(plan_id});


> Cancelar assinatura:

var subscription_id = "cae4fd53-2169-4b5f-ac48-026fade071ae"

var request = Paggi.Subscriptions.find(subscription_id);

```


### Mais informações

PAra mais informação, você pode conferir nossa documentação [aqui](https://developers.paggi.com/).
