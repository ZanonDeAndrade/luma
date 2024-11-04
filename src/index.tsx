import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando o Router
import App from './App';
import Checkout from './Checkout'; // Importando o componente Checkout
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Corrigido para /checkout */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();