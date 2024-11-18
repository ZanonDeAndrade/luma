import React from 'react';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <div className="links-nav">
      <Link to="/aromaterapia">Aromaterapia</Link>
      <Link to="/lembrancas">Lembranças</Link>
      <Link to="/decoracao">Decoração</Link>
    </div>
  );
};

export default NavigationBar;
