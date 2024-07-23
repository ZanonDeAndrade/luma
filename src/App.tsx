import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './Assets/logo.png';
import NavigationBar from './NavigationBar';
import AromaTerapia from './Aroma';
import Decoracao from './Decoracao';
import Lembrancas from './Lembrancas';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';
import Aroma5 from './Assets/Aroma5.jpeg';
import Aroma6 from './Assets/Aroma6.jpeg';
import Decoracao1 from './Assets/Decoração1.jpeg';
import Decoracao2 from './Assets/Decoração2.jpeg';
import Decoracao3 from './Assets/Decoração3.jpeg';
import Decoracao4 from './Assets/Decoração4.jpeg';
import Lembranca1 from './Assets/Lembrança1.jpeg';
import Lembranca2 from './Assets/Lembrança2.jpeg';
import Lembranca3 from './Assets/Lembrança3.jpeg';
import Lembranca4 from './Assets/Lembrança4.jpeg';
import Lembranca5 from './Assets/Lembrança5.jpeg';
import Lembranca6 from './Assets/Lembrança6.jpeg';

interface CartItem {
  itemIndex: number;
  category: string;
  quantity: number;
}

const App: React.FC = () => {
  const aromaItems = [
    { image: Aroma1, description: 'Descrição do Aroma 1', nome: 'Home Spray Okê Arô', price: 25.00 },
    { image: Aroma2, description: 'Descrição do Aroma 2', nome: 'Home Spray Odoyá SPA', price: 30.00 },
    { image: Aroma3, description: 'Descrição do Aroma 3', nome: 'Home Spray Limão do Vale', price: 20.00 },
    { image: Aroma4, description: 'Descrição do Aroma 4', nome: 'Home Spray Menta', price: 22.50 },
    { image: Aroma5, description: 'Descrição do Aroma 5', nome: 'Home Spray Illumina', price: 27.00 },
    { image: Aroma6, description: 'Descrição do Aroma 6', nome: 'Home Spray Dandara', price: 22.50 },
  ];

  const decoracaoItems = [
    { image: Decoracao1, description: 'Um elegante vaso de cerâmica que adiciona um toque sofisticado a qualquer ambiente. Perfeito para flores frescas ou artificiais.', nome: 'Vaso de Cerâmica', price: 80.00 },
    { image: Decoracao2, description: 'Quadro decorativo com arte abstrata moderna, ideal para salas de estar ou escritórios. Feito com materiais de alta qualidade.', nome: 'Quadro Abstrato', price: 120.00 },
    { image: Decoracao3, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', price: 150.00 },
    { image: Decoracao4, description: 'Espelho decorativo com moldura dourada, ideal para adicionar um toque de glamour ao seu quarto ou sala de estar.', nome: 'Espelho Dourado', price: 200.00 },
  ];

  const lembrancasItems = [
    { image: Lembranca1, description: 'Um elegante vaso de cerâmica que adiciona um toque sofisticado a qualquer ambiente. Perfeito para flores frescas ou artificiais.', nome: 'Vaso de Cerâmica', originalPrice: 'R$ 80,00', discountPrice: 'R$ 70,00' },
    { image: Lembranca2, description: 'Quadro decorativo com arte abstrata moderna, ideal para salas de estar ou escritórios. Feito com materiais de alta qualidade.', nome: 'Quadro Abstrato', originalPrice: 'R$ 120,00', discountPrice: 'R$ 100,00' },
    { image: Lembranca3, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', originalPrice: 'R$ 150,00', discountPrice: 'R$ 130,00' },
    { image: Lembranca4, description: 'Espelho decorativo com moldura dourada, ideal para adicionar um toque de glamour ao seu quarto ou sala de estar.', nome: 'Espelho Dourado', originalPrice: 'R$ 200,00', discountPrice: 'R$ 180,00' },
    { image: Lembranca5, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', originalPrice: 'R$ 150,00', discountPrice: 'R$ 130,00' },
    { image: Lembranca6, description: 'Espelho decorativo com moldura dourada, ideal para adicionar um toque de glamour ao seu quarto ou sala de estar.', nome: 'Espelho Dourado', originalPrice: 'R$ 200,00', discountPrice: 'R$ 180,00' },
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
    return parsedFavoriteItems.filter((index: number) => index >= 0 && index < aromaItems.length + decoracaoItems.length);
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

  const addToCart = (itemIndex: number, category: string) => {
    setCartItems(prevCartItems => {
      const itemInCart = prevCartItems.find(item => item.itemIndex === itemIndex && item.category === category);
      let newCartItems;
      if (itemInCart) {
        newCartItems = prevCartItems.map(item =>
          item.itemIndex === itemIndex && item.category === category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCartItems = [...prevCartItems, { itemIndex, category, quantity: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const incrementQuantity = (itemIndex: number, category: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.itemIndex === itemIndex && item.category === category
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (itemIndex: number, category: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.itemIndex === itemIndex && item.category === category && item.quantity > 1
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

  const removeFromCart = (itemIndex: number, category: string) => {
    setCartItems(prevCartItems => {
      const newCartItems = prevCartItems.filter(item => !(item.itemIndex === itemIndex && item.category === category));
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

  // Função para calcular o total do pedido
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = cartItem.category === 'aroma' ? aromaItems[cartItem.itemIndex] : decoracaoItems[cartItem.itemIndex];
      return total + item.price * cartItem.quantity;
    }, 0).toFixed(2);
  };

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
        <AromaTerapia addToCart={(index) => addToCart(index, 'aroma')} toggleFavorite={toggleFavorite} favoriteItems={favoriteItems} />
        <Decoracao addToCart={(index) => addToCart(index, 'decoracao')} toggleFavorite={toggleFavorite} favoriteItems={favoriteItems} />
        <Lembrancas addToCart={(index) => addToCart(index, 'lembrancas')} toggleFavorite={toggleFavorite} favoriteItems={favoriteItems} />
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
            <>
              <ul>
                {cartItems.map((cartItem, idx) => {
                  const item = cartItem.category === 'aroma' ? aromaItems[cartItem.itemIndex] : cartItem.category === 'decoracao' ? decoracaoItems[cartItem.itemIndex] : lembrancasItems[cartItem.itemIndex];
                  return (
                    <li key={idx}>
                      {item ? (
                        <>
                          <img src={item.image} alt={`item${cartItem.itemIndex + 1}`} />
                          <span>{item.nome}</span>
                          <div className="quantity">
                            <button className="decrement" onClick={() => decrementQuantity(cartItem.itemIndex, cartItem.category)}>-</button>
                            <span>{cartItem.quantity}</span>
                            <button className="increment" onClick={() => incrementQuantity(cartItem.itemIndex, cartItem.category)}>+</button>
                          </div>
                          <button className="remove-item" onClick={() => removeFromCart(cartItem.itemIndex, cartItem.category)}>&times;</button>
                        </>
                      ) : (
                        <span>Item não encontrado</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="total">
                <h3>Total: R$ {calculateTotal()}</h3>
              </div>
            </>
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
              {favoriteItems.map((itemIndex, idx) => {
                const item = itemIndex < aromaItems.length ? aromaItems[itemIndex] : itemIndex < aromaItems.length + decoracaoItems.length ? decoracaoItems[itemIndex - aromaItems.length] : lembrancasItems[itemIndex - aromaItems.length - decoracaoItems.length];
                return (
                  <li key={idx}>
                    {item ? (
                      <>
                        <img src={item.image} alt={`item${itemIndex + 1}`} />
                        <span>{item.nome}</span>
                        <button className="remove-item" onClick={() => removeFromFavorites(idx)}>&times;</button>
                      </>
                    ) : (
                      <span>Item não encontrado</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default App;