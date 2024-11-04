import React from 'react';
import { useLocation } from 'react-router-dom';

interface CartItem {
  title: string;
  quantity: number;
  unit_price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  // Log para depuração
  console.log('Estado recebido:', state);

  // Verifica se o estado é válido
  if (!state || !Array.isArray(state.items) || typeof state.total !== 'number') {
    return <h2>Não há itens no carrinho.</h2>;
  }

  // Desestrutura o estado
  const { items, total } = state as CartState;

  const handlePayment = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item: CartItem) => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
          total, // Enviando o total para o backend
        }),
      });

      const data = await response.json();

      if (data.link_pagamento) {
        window.location.href = data.link_pagamento; // Redireciona para o link de pagamento
      } else {
        console.error('Link de pagamento não encontrado na resposta.', data);
      }
    } catch (error) {
      console.error('Erro ao iniciar o pagamento:', error);
    }
  };

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {items.map((item: CartItem, index: number) => (
            <li key={index}>
              {item.title} - Quantidade: {item.quantity} - Preço Unitário: R$ {item.unit_price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={handlePayment}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;