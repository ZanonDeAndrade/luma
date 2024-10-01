const express = require('express');
const mercadopago = require('mercadopago');

// Configure Mercado Pago com o token de acesso
mercadopago.configurations.setAccessToken('APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072');

const app = express();
app.use(express.json());

app.post('/create_preference', (req, res) => {
  const { items } = req.body;

  const preference = {
    items: items.map((item) => ({
      title: item.title,
      unit_price: item.unit_price,
      quantity: item.quantity,
    })),
    back_urls: {
      success: 'https://seusite.com/success',
      failure: 'https://seusite.com/failure',
      pending: 'https://seusite.com/pending',
    },
    auto_return: 'approved',
  };

  mercadopago.preferences.create(preference)
    .then((response) => {
      res.json({
        id: response.body.id,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
