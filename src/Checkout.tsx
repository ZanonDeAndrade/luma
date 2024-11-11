import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Checkout.css";

interface CartItem {
  title: string;
  quantity: number;
  unit_price: number;
  image: string; // Adiciona a propriedade 'image' para a imagem do produto
}

interface CartState {
  items: CartItem[];
  total: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Log para depuração
  console.log('Estado recebido:', state);

  // Verifica se o estado é válido
  if (!state || !Array.isArray(state.items) || typeof state.total !== 'number') {
    return <h2 className="checkout-empty-message">Não há itens no carrinho.</h2>;
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
            image: item.image, // Envia a imagem para o backend, se necessário
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

  const handleBack = () => {
    navigate('/'); // Redireciona para a página principal
  };

  return (
    <div className="checkout-container">
      <span className="checkout-back-arrow" onClick={handleBack}>
        ←
      </span>
      <h2 className="checkout-header">Carrinho de Compras</h2>
      {items.length === 0 ? (
        <p className="checkout-empty-message">Seu carrinho está vazio.</p>
      ) : (
        <ul className="checkout-item-list">
          {items.map((item: CartItem, index: number) => (
            <li className="checkout-item" key={index}>
              <img 
                src={item.image} 
                alt={item.title} 
              />
              <div className='descricao'>
                {item.title} - Quantidade: {item.quantity}
                <br />
                <span>Preço Unitário: R$ {item.unit_price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3 className="checkout-total">Total: R$ {total.toFixed(2)}</h3>
      <button className="checkout-button" onClick={handlePayment}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
