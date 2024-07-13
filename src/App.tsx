import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './Assets/logo.png';
import NavigationBar from './NavigationBar';
import AromaTerapia from './Aroma';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';
import Aroma5 from './Assets/Aroma5.jpeg';
import Aroma6 from './Assets/Aroma6.jpeg';

interface CartItem {
  itemIndex: number;
  quantity: number;
}

const App: React.FC = () => {
  const items = [
    { image: Aroma1, description: 'Descrição do Aroma 1', nome: 'Home Spray Okê Arô' },
    { image: Aroma2, description: 'Descrição do Aroma 2', nome: 'Home Spray Odoyá SPA' },
    { image: Aroma3, description: 'Descrição do Aroma 3', nome: 'Home Spray Limão do Vale' },
    { image: Aroma4, description: 'Descrição do Aroma 4', nome: 'Home Spray Menta' },
    { image: Aroma5, description: 'Descrição do Aroma 5', nome: 'Home Spray Luz Materna' },
    { image: Aroma6, description: 'Descrição do Aroma 6', nome: 'Home Spray Menta' },
  ];

  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
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
      const itemInCart = prevCartItems.find(item => item.itemIndex === itemIndex);
      let newCartItems;
      if (itemInCart) {
        newCartItems = prevCartItems.map(item =>
          item.itemIndex === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCartItems = [...prevCartItems, { itemIndex, quantity: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const incrementQuantity = (itemIndex: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.itemIndex === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemIndex: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.itemIndex === itemIndex && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
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

  const removeFromCart = (itemIndex: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = prevCartItems.filter(item => item.itemIndex !== itemIndex);
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
              {cartItems.map((cartItem, idx) => (
                <li key={idx}>
                  {items[cartItem.itemIndex] ? (
                    <>
                      <img src={items[cartItem.itemIndex].image} alt={`aroma${cartItem.itemIndex + 1}`} />
                      <span>{items[cartItem.itemIndex].nome}</span>
                      <div className="quantity">
                        <button className="decrement" onClick={() => decrementQuantity(cartItem.itemIndex)}>-</button>
                        <span>{cartItem.quantity}</span>
                        <button className="increment" onClick={() => incrementQuantity(cartItem.itemIndex)}>+</button>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(cartItem.itemIndex)}>&times;</button>
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
