import React from 'react';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <div className="links-nav">
      <a href="/aromaterapia">Aromaterapia</a>
      <a href="/lembrancas">Lembranças</a>
      <a href="/decoracao">Decoração</a>
      <a href="/presentes">Presentes</a>
      <a href="/marketing-olfativo">Marketing Olfativo (Empresarial)</a>
    </div>
  );
};

export default NavigationBar;