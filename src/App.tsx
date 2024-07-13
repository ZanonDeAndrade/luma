import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './Assets/logo.png';
import NavigationBar from './NavigationBar';
import AromaTerapia from './Aroma';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';

const App: React.FC = () => {
  const items = [
    { image: Aroma1, description: 'Descrição do Aroma 1', nome: 'Home Spray Okê Arô', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma2, description: 'Descrição do Aroma 2', nome: 'Home Spray Odoyá SPA', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma3, description: 'Descrição do Aroma 3', nome: 'Home Spray Limão do Vale', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma4, description: 'Descrição do Aroma 4', nome: 'Home Spray Menta', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
  ];

  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<number[]>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const parsedCartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
    return parsedCartItems.filter((index: number) => index >= 0 && index < items.length);
  });

  const [isFavoritesVisible, setIsFavoritesVisible] = useState<boolean>(false);
  const [favoriteItems, setFavoriteItems] = useState<number[]>(() => {
    const savedFavoriteItems = localStorage.getItem('favoriteItems');
    const parsedFavoriteItems = savedFavoriteItems ? JSON.parse(savedFavoriteItems) : [];
    return parsedFavoriteItems.filter((index: number) => index >= 0 && index < items.length);
  });

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    console.log('Favorite Items:', favoriteItems);
  }, [cartItems, favoriteItems]);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleFavoritesVisibility = () => {
    setIsFavoritesVisible(!isFavoritesVisible);
  };

  const addToCart = (itemIndex: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems, itemIndex];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const toggleFavorite = (itemIndex: number) => {
    setFavoriteItems(prevFavoriteItems => {
      const newFavoriteItems = prevFavoriteItems.includes(itemIndex)
        ? prevFavoriteItems.filter(favIndex => favIndex !== itemIndex)
        : [...prevFavoriteItems, itemIndex];
      localStorage.setItem('favoriteItems', JSON.stringify(newFavoriteItems));
      return newFavoriteItems;
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = prevCartItems.filter((_, i) => i !== index);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const removeFromFavorites = (index: number) => {
    setFavoriteItems(prevFavoriteItems => {
      const newFavoriteItems = prevFavoriteItems.filter((_, i) => i !== index);
      localStorage.setItem('favoriteItems', JSON.stringify(newFavoriteItems));
      return newFavoriteItems;
    });
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

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
            <button className="icon-button" onClick={toggleFavoritesVisibility}>
              <i className="fas fa-heart"></i>
              <span>Favoritos</span>
              <i className="fas fa-chevron-down"></i>
              {favoriteItems.length > 0 && <span className="favorites-count">{favoriteItems.length}</span>}
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
        <AromaTerapia addToCart={addToCart} toggleFavorite={toggleFavorite} favoriteItems={favoriteItems} />
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
                  {items[itemIndex] ? (
                    <>
                      <img src={items[itemIndex].image} alt={`aroma${itemIndex + 1}`} />
                      <span>{items[itemIndex].nome}</span>
                      <button className="remove-item" onClick={() => removeFromCart(idx)}>&times;</button>
                    </>
                  ) : (
                    <span>Item não encontrado</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button className="checkout-button">Finalizar Compra</button>
        </div>
      )}

      {isFavoritesVisible && (
        <div className="favorites">
          <div className="favorites-header">
            <h2>Favoritos</h2>
            <button onClick={toggleFavoritesVisibility} className="close-favorites">&times;</button>
          </div>
          {favoriteItems.length === 0 ? (
            <p>Você não tem itens favoritos</p>
          ) : (
            <ul>
              {favoriteItems.map((itemIndex, idx) => (
                <li key={idx}>
                  {items[itemIndex] ? (
                    <>
                      <img src={items[itemIndex].image} alt={`aroma${itemIndex + 1}`} />
                      <span>{items[itemIndex].nome}</span>
                      <button className="remove-item" onClick={() => removeFromFavorites(idx)}>&times;</button>
                    </>
                  ) : (
                    <span>Item não encontrado</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
