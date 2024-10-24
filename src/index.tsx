import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando o Router
import './index.css';
import App from './App';
import Carrinho from './Carrinho'; // Importando o componente Carrinho
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/carrinho" element={<Carrinho />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();