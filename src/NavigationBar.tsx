// NavigationBar.tsx
import React from 'react';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
  return (
    <div className="links-nav">
      <a href="#">Aromaterapia</a>
      <a href="#">Lembranças</a>
      <a href="#">Decoração</a>
      <a href="#">Presentes</a>
      <a href="#">Marketing Olfativo (Empresarial)</a>
    </div>
  );
};

export default NavigationBar;
