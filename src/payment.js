const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

// Chaves públicas e secretas
const publicKey = 'APP_USR-9b2ad05c-d94d-4b3e-823d-b44b381ee0a8';
const accessToken = 'APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072';

// Configuração do Mercado Pago
mercadopago.configurations.setAccessToken(accessToken);

// Rota para processar pagamentos
router.post('/payment', (req, res) => {
  const { transactionAmount, description, paymentMethodId, payer } = req.body;

  const paymentData = {
    transaction_amount: transactionAmount,
    description: description,
    payment_method_id: paymentMethodId,
    payer: {
      email: payer.email,
    },
  };

  // Criar um pagamento no Mercado Pago
  mercadopago.payment.create(paymentData)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((error) => {
      console.error('Erro ao criar pagamento:', error);
      res.status(500).send({ message: 'Erro ao criar pagamento', error: error.message });
    });
});

module.exports = router;
