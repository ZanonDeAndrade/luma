import React from 'react';
import { Link } from 'react-router-dom';

const Carrinho: React.FC = () => {
  return (
    <div className="carrinho-page">
      <h1>Carrinho de Compras</h1>
      <p>Aqui estão os itens do seu carrinho...</p>
      <Link to="/">Voltar para a Loja</Link>
    </div>
  );
};

export default Carrinho;
