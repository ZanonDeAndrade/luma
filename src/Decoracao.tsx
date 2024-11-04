import React, { useState } from 'react';
import Slider from 'react-slick';
import Decoracao1 from './Assets/Decoração1.jpeg';
import Decoracao2 from './Assets/Decoração2.jpeg';
import Decoracao3 from './Assets/Decoração3.jpeg';
import Decoracao4 from './Assets/Decoração4.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DecoracaoProps {
  addToCart: (itemIndex: number) => void;
  toggleFavorite: (itemIndex: number) => void;
  favoriteItems: number[];
}

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow next" onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow prev" onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const Decoracao: React.FC<DecoracaoProps> = ({ addToCart, toggleFavorite, favoriteItems }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const items = [
    { image: Decoracao1, description: 'Com o adorno de mesa da Oração do Pai Nosso, você pode elevar seus momentos de fé e criar um ambiente único e inspirador. ✨', nome: 'Adorno Oração Pai Nosso ', originalPrice: 'R$ 25,00', discountPrice: 'R$ 19,90' },
    { image: Decoracao2, description: 'Quadro decorativo com arte abstrata moderna, ideal para salas de estar ou escritórios. Feito com materiais de alta qualidade.', nome: 'Quadro Abstrato', originalPrice: 'R$ 120,00', discountPrice: 'R$ 100,00' },
    { image: Decoracao3, description: 'Uma luminária de mesa estilosa que proporciona uma iluminação suave e agradável. Perfeita para mesas de estudo ou cabeceiras.', nome: 'Luminária de Mesa', originalPrice: 'R$ 150,00', discountPrice: 'R$ 130,00' },
    { image: Decoracao4, description: 'Muito além de tintas, colas, pérolas e guipir… É customizar nossa Mãezinha Nossa Senhora Aparecida. Que alegria Deus me permitir levar a fé para muitos lares através de minhas mãos, de minha arte!', nome: 'Imagem Nossa Senhora', originalPrice: 'R$ 99,90', discountPrice: 'R$ 79,90' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
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

export default Decoracao;
