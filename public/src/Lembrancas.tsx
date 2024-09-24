import React, { useState } from 'react';
import Slider from 'react-slick';
import Lembranca1 from './Assets/Lembrança1.jpeg';
import Lembranca2 from './Assets/Lembrança2.jpeg';
import Lembranca3 from './Assets/Lembrança3.jpeg';
import Lembranca4 from './Assets/Lembrança4.jpeg';
import Lembranca5 from './Assets/Lembrança5.jpeg';
import Lembranca6 from './Assets/Lembrança6.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LembrancaProps {
  addToCart: (itemIndex: number) => void;
  toggleFavorite: (itemIndex: number) => void;
  favoriteItems: number[];
}

const Lembrancas: React.FC<LembrancaProps> = ({ addToCart, toggleFavorite, favoriteItems }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const items = [
    { image: Lembranca1, description: 'Um elegante vaso de cerâmica que adiciona um toque sofisticado a qualquer ambiente. Perfeito para flores frescas ou artificiais.', nome: 'Vaso de Cerâmica', originalPrice: 'R$ 80,00', discountPrice: 'R$ 70,00' },
    { image: Lembranca2, description: 'Quadro decorativo com arte abstrata moderna, ideal para salas de estar ou escritórios. Feito com materiais de alta qualidade.', nome: 'Quadro Abstrato', originalPrice: 'R$ 120,00', discountPrice: 'R$ 100,00' },
    { image: Lembranca3, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', originalPrice: 'R$ 150,00', discountPrice: 'R$ 130,00' },
    { image: Lembranca4, description: 'Espelho decorativo com moldura dourada, ideal para adicionar um toque de glamour ao seu quarto ou sala de estar.', nome: 'Espelho Dourado', originalPrice: 'R$ 200,00', discountPrice: 'R$ 180,00' },
    { image: Lembranca5, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', originalPrice: 'R$ 150,00', discountPrice: 'R$ 130,00' },
    { image: Lembranca6, description: 'Espelho decorativo com moldura dourada, ideal para adicionar um toque de glamour ao seu quarto ou sala de estar.', nome: 'Espelho Dourado', originalPrice: 'R$ 200,00', discountPrice: 'R$ 180,00' },
];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 768, // largura de tela até 768px (dispositivos móveis)
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
  };

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleAddToCart = (index: number) => {
    addToCart(index);
    setNotification(`${items[index].nome} adicionado com sucesso à sacola de compras!`);
    setTimeout(() => setNotification(null), 3000); // Remove a notificação após 3 segundos
  };

  return (
    <div className="container">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className={`item ${flippedIndex === index ? 'flipped' : ''}`}>
            <div className="inner">
              <div className="front">
                <div
                  className={`heart-icon ${favoriteItems.includes(index) ? 'favorite' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique na seção 'front' ative o flip
                    toggleFavorite(index);
                  }}
                >
                  <i className="fas fa-heart"></i>
                </div>
                <img src={item.image} alt={`decoracao${index + 1}`} />
                <div className='nome'>{item.nome}</div>
                <div className='price'>
                  <span className='original-price'>{item.originalPrice}</span> <span className='discount-price'>{item.discountPrice}</span>
                </div>
                <div className="button-container">
                  <button onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão ative o flip
                    handleAddToCart(index);
                  }}>Adicionar a Sacola</button>
                  <button onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão ative o flip
                    handleFlip(index);
                  }}>Ver Descrição</button>
                </div>
              </div>
              <div className="back">
                <p>{item.description}</p>
                <div className="back-buttons">
                  <div className="flip-button" onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão ative o flip
                    handleFlip(index);
                  }}>Voltar</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Lembrancas;
