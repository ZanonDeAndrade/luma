const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

const publicKey = 'APP_USR-9b2ad05c-d94d-4b3e-823d-b44b381ee0a8';
const accessToken = 'APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072';

mercadopago.configure({
  access_token: accessToken,
});

router.post('/payment', (req, res) => {
  const paymentData = req.body;

  // Criar um pagamento no Mercado Pago
  mercadopago.payment.create(paymentData).then((payment) => {
    res.status(201).send(payment);
  }).catch((error) => {
    console.error(error);
    res.status(500).send({ message: 'Erro ao criar pagamento' });
  });
});

module.exports = router;