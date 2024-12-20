import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Checkout.css";
import Logo from './Assets/logo.png';

interface CartItem {
  title: string;
  quantity: number;
  unit_price: number;
  image: string; // Propriedade para imagem do produto
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
    return (
      <div className="checkout-container">
        <h2 className="checkout-empty-message">Não há itens no carrinho.</h2>
        <button className="checkout-back-button" onClick={() => navigate('/')}>
          Voltar para a Loja
        </button>
      </div>
    );
  }

  // Desestrutura o estado
  const { items, total } = state as CartState;

  // Redireciona para o formulário de pedido
  const handleNavigateToForm = () => {
    navigate('/formulario-pedido', {
      state: {
        items: items.map(item => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          image: item.image,
        })),
        total,
      },
    });
  };

  // Função para iniciar o pagamento
  const handlePayment = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5000';

      const response = await fetch(`${backendUrl}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item: CartItem) => ({
            title: item.title,
            quantity: item.quantity,
            unit_price: item.unit_price,
            image: item.image,
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
    <div className="checkout-container">
      <div className="logo">
        <img className="Logo" src={Logo} alt="Logo" />
      </div>
      <span className="checkout-back-arrow" onClick={() => navigate('/')}>
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
                className="checkout-item-image"
              />
              <div className="checkout-item-description">
                {item.title} - Quantidade: {item.quantity}
                <br />
                <span>Preço Unitário: R$ {item.unit_price.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3 className="checkout-total">Total: R$ {total.toFixed(2)}</h3>
      <div className="checkout-buttons">
        <button className="checkout-button" onClick={handleNavigateToForm}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Checkout;