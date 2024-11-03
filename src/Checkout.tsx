import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout: React.FC = () => {
  const location = useLocation();
  const { state } = location; // Obtendo os dados passados

  // Verifica se os dados de pagamento estão disponíveis
  if (!state) {
    return <h2>Não há itens no carrinho.</h2>;
  }

  const { items, total } = state;

  // Configuração do Mercado Pago
  const publicKey = 'APP_USR-9b2ad05c-d94d-4b3e-823d-b44b381ee0a8'; // Substitua pela sua Public Key do Mercado Pago

  // Função para processar o pagamento
  const handlePayment = async () => {
    // Chame a API do seu servidor para criar uma preferência de pagamento
    const response = await fetch('http://localhost:3001/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
    const data = await response.json();

    // Redirecionar para o pagamento
    if (data.init_point) {
      window.location.href = data.init_point; // Redireciona para o Mercado Pago
    }
  };


  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {items.map((item: any, index: number) => (
          <li key={index}>
            {item.title} - Quantidade: {item.quantity} - Preço Unitário: R$ {item.unit_price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={handlePayment}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
