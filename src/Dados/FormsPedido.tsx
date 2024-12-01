import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormsPedido.css';

interface Item {
  title: string;
  quantity: number;
  unit_price: number;
}

const PedidoForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], total = 0 } = location.state || {};

  if (!items || items.length === 0) {
    console.error('Nenhum item no pedido ou estado inválido.');
    navigate('/');
    return null;
  }

  const [cliente, setCliente] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!cliente || !rua || !numero || !bairro || !cep || !telefone) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const pedidoData = {
      cliente,
      endereco: {
        rua,
        numero,
        bairro,
        cep,
      },
      telefone,
      items: items.map((item: Item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      total,
    };

    console.log('Dados do pedido:', pedidoData);

    try {
      setIsSubmitting(true);

      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${backendUrl}/pedido`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      const data = await response.json();
      console.log('Resposta do backend:', data);

      if (data.link_pagamento) {
        window.location.href = data.link_pagamento;
      } else {
        alert('Erro ao salvar o pedido. Verifique os dados e tente novamente.');
        console.error('Erro ao salvar o pedido ou link de pagamento não encontrado:', data);
      }
    } catch (error) {
      alert('Não foi possível processar o pedido. Tente novamente mais tarde.');
      console.error('Erro ao salvar pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form">
      <h2>Dados para Envio</h2>

      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Rua:</label>
        <input
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Número:</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Bairro:</label>
        <input
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>CEP:</label>
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
      </div>

      <h3>Itens no Pedido:</h3>
      <ul className="pedido-itens">
        {items.map((item: Item, index: number) => (
          <li key={index}>
            {item.title} - Quantidade: {item.quantity} - Preço Unitário: R$ {item.unit_price.toFixed( 2)}
          </li>
        ))}
      </ul>
      <h4>Total: R$ {total.toFixed(2)}</h4>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processando...' : 'Finalizar Compra'}
        </button>
        <button type="button" onClick={handleBack}>
          Voltar
        </button>
      </div>
    </form>
  );
};

export default PedidoForm;