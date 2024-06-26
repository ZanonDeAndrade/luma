import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './Assets/logo.png';
import NavigationBar from './NavigationBar';
import Aroma from './Aroma';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';

const App: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<number[]>(() => {
    // Restaurar estado do carrinho do localStorage ao carregar a página
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const items = [
    { image: Aroma1, description: 'Descrição do Aroma 1', nome: 'Home Spray Okê Arô', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma2, description: 'Descrição do Aroma 2', nome: 'Home Spray Odoyá SPA', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma3, description: 'Descrição do Aroma 3', nome: 'Home Spray Limão do Vale', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma4, description: 'Descrição do Aroma 4', nome: 'Home Spray Menta', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
  ];

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const addToCart = (itemIndex: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems, itemIndex];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Salvar no localStorage
      return newCartItems;
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = prevCartItems.filter((_, i) => i !== index);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Atualizar no localStorage
      return newCartItems;
    });
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salvar no localStorage
  }, [cartItems]);

  return (
    <div className="App">
      <div className="background-section background1">
        <div className="Logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="pesquisa">
          <input type="text" placeholder="O que você procura hoje?" />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <div className="icons">
            <button className="icon-button">
              <i className="fas fa-heart"></i>
              <span>Favoritos</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <button className="icon-button" onClick={toggleCartVisibility}>
              <i className="fas fa-shopping-bag"></i>
              <span>Sacola</span>
              <i className="fas fa-chevron-down"></i>
              {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </button>
          </div>
        </div>
        <NavigationBar />
        <Aroma addToCart={addToCart} />
      </div>

      {isCartVisible && (
        <div className="cart">
          <div className="cart-header">
            <h2>Sacola de Compras</h2>
            <button onClick={toggleCartVisibility} className="close-cart">&times;</button>
          </div>
          {cartItems.length === 0 ? (
            <p>Sua sacola está vazia</p>
          ) : (
            <ul>
              {cartItems.map((itemIndex, idx) => (
                <li key={idx}>
                  <img src={items[itemIndex].image} alt={`aroma${itemIndex + 1}`} />
                  <span>{items[itemIndex].nome}</span>
                  <button className="remove-item" onClick={() => removeFromCart(idx)}>&times;</button>
                </li>
              ))}
            </ul>
          )}
          <button className="checkout-button">Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default App;
