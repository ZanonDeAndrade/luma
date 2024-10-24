const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
const PORT = 4000;

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072', // Substitua pela sua Access Token do Mercado Pago
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
      success: 'http://localhost:3000/success', // URL de sucesso
      failure: 'http://localhost:3000/failure', // URL de falha
      pending: 'http://localhost:3000/pending', // URL de pendência
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body .init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar preferência de pagamento' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});