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
import Boleto from './Assets/Boleto.png';
import Visa from './Assets/Visa.png';
import Elo from './Assets/Elo.png';
import MasterCard from './Assets/Master.png';
import Pix from './Assets/Pix.png';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

interface CartItem {
  itemIndex: number;
  category: string;
  quantity: number;
}

const App: React.FC = () => {
  const navigate = useNavigate(); // Inicializando useNavigate

  const aromaItems = [
    { image: Aroma1, description: 'Imagine-se em uma floresta amazônica, com a brisa tropical acariciando sua pele e o aroma da floresta inundando o ar. Inspirado na majestade da floresta amazônica, o Okê Arô é a maneira perfeita de começar o dia com energia e bem-estar. Sua saída aromática é refrescante, com notas verdes e cereja.', nome: 'Home Spray Okê Arô', price: 29.90 },
    { image: Aroma2, description: 'Poseidon, o Deus dos mares, em seu Home Spray de 100ml, vem sendo representado por um aroma fresco como o cheiro da chuva. Remete ao aconchego e sua indicação é para o uso em dormitórios, devido ao seu forte poder de higienização mental. Conheça a coleção Divinus e descubra o aroma perfeito para você!', nome: 'Home Spray Poseidon', price: 29.90 },
    { image: Aroma3, description: 'Conhecido por suas propriedades revitalizantes e estimulantes. Ele é capaz de despertar os sentidos, melhorar o humor e aumentar a produtividade. O nosso Home Spray Limão do Vale é feito com ingredientes 100% naturais e de alta qualidade. Ele contém notas de limão siciliano, laranja doce, bergamota e capim-limão.', nome: 'Home Spray Limão do Vale', price: 29.90 },
    { image: Aroma4, description: 'Rico em mentol, um composto que tem efeitos neuroativos, como: Melhorar o foco e a concentração; Reduzir o estresse e a ansiedade, e até mesmo aliviar a dor. O nosso Home Spray de Menta é feito com óleos essenciais de menta, cânfora e lavanda, que proporcionam um aroma agradável e envolvente, com efeitos benéficos para a saúde e o bem-estar.', nome: 'Home Spray Menta', price: 29.90  },
    { image: Aroma5, description: 'Um aroma acolhedor e inspirador que expressa toda a força e amor de uma mãe.', nome: 'Home Spray Illumina', price: 32.90 },
    { image: Aroma6, description: 'Traga a energia vibrante da Dandara para o seu lar! Um aroma cítrico e frutado, com a doçura da baunilha com folhas de ouro. Composto por óleos essenciais cuidadosamente selecionados, o Home Spray Dandara é perfeito para quem busca um ambiente alegre e revigorante e sentir uma sensação de bem-estar e positividade.', nome: 'Home Spray Dandara', price: 34.90 },
  ];

  const decoracaoItems = [
    { image: Decoracao1, description: 'Com o adorno de mesa da Oração do Pai Nosso, você pode elevar seus momentos de fé e criar um ambiente único e inspirador. ✨', nome: 'Adorno Oração Pai Nosso', price: 19.90},
    { image: Decoracao2, description: 'Quadro decorativo com arte abstrata moderna.', nome: 'Quadro Abstrato', price: 120.00 },
    { image: Decoracao3, description: 'Uma luminária de mesa estilosa.', nome: 'Luminária de Mesa', price: 150.00 },
    { image: Decoracao4, description: 'Muito além de tintas, colas, pérolas e guipir… É customizar nossa Mãezinha Nossa Senhora Aparecida. Que alegria Deus me permitir levar a fé para muitos lares através de minhas mãos, de minha arte!', nome: 'Imagem Nossa Senhora', price: 79.90},
  ];

  const lembrancasItems = [
    { image: Lembranca1, description: 'A essência da luz materna é a capacidade de amar sem limites, de doar tudo de si sem esperar nada em troca. Presenteie a mulher que mais ilumina sua vida, com a vela aromática da Luma.', nome: 'Vela Aromática Illumina', price: 39.90 },
    { image: Lembranca2, description: 'Descrição da Lembrança 2', nome: 'Lembrança 2', price: 100.00 },
    { image: Lembranca3, description: 'Descrição da Lembrança 3', nome: 'Lembrança 3', price: 130.00 },
    { image: Lembranca4, description: 'Descrição da Lembrança 4', nome: 'Lembrança 4', price: 180.00 },
    { image: Lembranca5, description: 'Descrição da Lembrança 5', nome: 'Lembrança 5', price: 70.00 },
    { image: Lembranca6, description: 'Descrição da Lembrança 6', nome: 'Lembrança 6', price: 100.00 },
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
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.itemIndex === itemIndex && item.category === category);
      let newCartItems;
      if (itemInCart) {
        newCartItems = prevCartItems.map((item) =>
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
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.itemIndex === itemIndex && item.category === category
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (itemIndex: number, category: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.itemIndex === itemIndex && item.category === category && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleFavorite = (itemIndex: number) => {
    setFavoriteItems((prevFavoriteItems) => {
      const newFavoriteItems = prevFavoriteItems.includes(itemIndex)
        ? prevFavoriteItems.filter((favIndex) => favIndex !== itemIndex)
        : [...prevFavoriteItems, itemIndex];
      localStorage.setItem('favoriteItems', JSON.stringify(newFavoriteItems));
      return newFavoriteItems;
    });
  };

  const removeFromCart = (itemIndex: number, category: string) => {
    setCartItems((prevCartItems) => {
      const newCartItems = prevCartItems.filter((item) => !(item.itemIndex === itemIndex && item.category === category));
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const removeFromFavorites = (index: number) => {
    setFavoriteItems((prevFavoriteItems) => {
      const newFavoriteItems = prevFavoriteItems.filter((_, i) => i !== index);
      localStorage.setItem('favoriteItems', JSON.stringify(newFavoriteItems));
      return newFavoriteItems;
    });
  };

  const calculateTotal = (): string => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      if (cartItem.category === 'aroma') {
        total += aromaItems[cartItem.itemIndex].price * cartItem.quantity;
      } else if (cartItem.category === 'decoracao') {
        total += decoracaoItems[cartItem.itemIndex].price * cartItem.quantity;
      } else {
        total += lembrancasItems[cartItem.itemIndex].price * cartItem.quantity;
      }
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.");
      return; // Não prosseguir se o carrinho estiver vazio
    }

    const total = parseFloat(calculateTotal()); // Certifique-se de que o total é um número
    const items = cartItems.map((cartItem) => ({
      title: cartItem.category === 'aroma' ? aromaItems[cartItem.itemIndex].nome :
             cartItem.category === 'decoracao ' ? decoracaoItems[cartItem.itemIndex].nome :
             lembrancasItems[cartItem.itemIndex].nome,
      quantity: cartItem.quantity,
      unit_price: cartItem.category === 'aroma' ? aromaItems[cartItem.itemIndex].price :
                  cartItem.category === 'decoracao' ? decoracaoItems[cartItem.itemIndex].price :
                  lembrancasItems[cartItem.itemIndex].price,
    }));

    navigate('/Checkout', { state: { items, total } });
  };

  return (
    <div className="App">
      <div className="background-section background1">
        <div className="Logo">
          <img src={logo} alt="Logo" />
        </div>
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
        <div className="pesquisa">
          <input type="text" placeholder="O que você procura hoje?" />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
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
                {cartItems.map((cartItem, idx ) => {
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
              <button className='checkout-button' onClick={handleCheckout}>Finalizar Compra</button>
            </>
          )}
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

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="sobre">
              <h3 className="footer-title">Sobre Nós</h3>
              <p>Somos apaixonados por criar produtos que inspiram e trazem alegria para o seu dia a dia.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h3 className="footer-title">Atendimento</h3>
              <ul>
                <li><a href="/central">Central de Atendimento</a></li>
                <li><a href="/fale">Fale Conosco</a></li>
                <li><a className='perguntas' href="/perguntas">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div className="col-md-7">
              <h3 className="footer-title-redes">Redes Sociais</h3>
              <ul className="social-icons">
                <li><a href="https://www.facebook.com/lumaquartacolonia"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com/lumaquartacolonia/"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>

          {/* Seção "Formas de Pagamento" */}
          <div className="row">
            <div className="col-md-12">
              <h3 className="footer-title-pagamento">Formas de Pagamento</h3>
              <div className="payment-methods">
                <img src={Visa} alt="Visa" />
                <img src={MasterCard} alt="MasterCard" />
                <img src={Elo} alt="Elo" />
                <img src={Boleto} alt="Boleto" />
                <img className="pix" src={Pix} alt="Pix" />
              </div>
            </div>
          </div>

          {/* Direitos reservados */}
          <div className="row">
            <div className="col-md -12_text-center">
              <p className="copyright"> 2024 Luma Quarta Colônia. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;