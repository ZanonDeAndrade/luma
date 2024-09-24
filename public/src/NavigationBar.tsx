import React from 'react';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <div className="links-nav">
      <a href="/aromaterapia">Aromaterapia</a>
      <a href="/lembrancas">Lembranças</a>
      <a href="/decoracao">Decoração</a>
    </div>
  );
};

export default NavigationBar;