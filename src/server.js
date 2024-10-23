const express = require('express');
const mercadopago = require('mercadopago');

const app = express();

// Configurar o Mercado Pago com o access_token
mercadopago.configurations.setAccessToken('APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072');

// Middleware para processar JSON
app.use(express.json());

// Rota de teste para pagamento
app.post('/payment', async (req, res) => {
    const { transactionAmount, description, paymentMethodId, payerEmail } = req.body;

    const paymentData = {
        transaction_amount: transactionAmount,
        description: description,
        payment_method_id: paymentMethodId,
        payer: {
            email: payerEmail
        }
    };

    try {
        const payment = await mercadopago.payment.save(paymentData);
        res.status(200).json({ payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
