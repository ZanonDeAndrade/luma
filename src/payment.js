// payment.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config(); // Carrega variáveis de ambiente

const app = express();
const PORT = 4000;

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

app.use(cors());
app.use(bodyParser.json());

// Rota para criar a preferência de pagamento
app.post('/create_preference', async (req, res) => {
  const { items } = req.body;

  const preference = {
    items: items.map(item => ({
      title: item.title,
      quantity: item.quantity,
      currency_id: 'BRL',
      unit_price: item.unit_price,
    })),
    back_urls: {
      success: 'http://localhost:3000/success',
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
});

// Rota para processar pagamentos
app.post('/payment', async (req, res) => {
  const { transactionAmount, description, paymentMethodId, payer } = req.body;

  const paymentData = {
    transaction_amount: transactionAmount,
    description: description,
    payment_method_id: paymentMethodId,
    payer: {
      email: payer.email,
    },
  };

  try {
    const response = await mercadopago.payment.create(paymentData);
    res.status(201).send(response);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).send({ message: 'Erro ao criar pagamento', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
