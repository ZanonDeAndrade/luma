import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Checkout from './Checkout';
import PedidoForm from './Dados/FormsPedido'; // Importe o PedidoForm
import AdminPanel from './Adm/AdminPanel';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/formulario-pedido" element={<PedidoForm />} /> 
        <Route path="/admin" element={<AdminPanel />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
