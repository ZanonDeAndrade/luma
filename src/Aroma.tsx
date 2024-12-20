import React, { useState } from 'react';
import Slider from 'react-slick';
import './Aroma.css'; 
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';
import Aroma5 from './Assets/Aroma5.jpeg';
import Aroma6 from './Assets/Aroma6.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface AromaProps {
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

const AromaTerapia: React.FC<AromaProps> = ({ addToCart, toggleFavorite, favoriteItems }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const items = [
    { image: Aroma1, description: 'Imagine-se em uma floresta amazônica, com a brisa tropical acariciando sua pele e o aroma da floresta inundando o ar. Inspirado na majestade da floresta amazônica, o Okê Arô é a maneira perfeita de começar o dia com energia e bem-estar. Sua saída aromática é refrescante, com notas verdes e cereja.', nome: 'Home Spray Okê Arô', originalPrice: 'R$ 35,00', discountPrice: 'R$ 29,90' },
    { image: Aroma2, description: 'Poseidon, o Deus dos mares, em seu Home Spray de 100ml, vem sendo representado por um aroma fresco como o cheiro da chuva. Remete ao aconchego e sua indicação é para o uso em dormitórios, devido ao seu forte poder de higienização mental. Conheça a coleção Divinus e descubra o aroma perfeito para você!', nome: 'Home Spray Poseidon', originalPrice: 'R$ 35,00', discountPrice: 'R$ 29,90' },
    { image: Aroma3, description: 'Conhecido por suas propriedades revitalizantes e estimulantes. Ele é capaz de despertar os sentidos, melhorar o humor e aumentar a produtividade. O nosso Home Spray Limão do Vale é feito com ingredientes 100% naturais e de alta qualidade. Ele contém notas de limão siciliano, laranja doce, bergamota e capim-limão.', nome: 'Home Spray Limão do Vale', originalPrice: 'R$ 35,00', discountPrice: 'R$ 29,90' },
    { image: Aroma4, description: 'Rico em mentol, um composto que tem efeitos neuroativos, como: Melhorar o foco e a concentração; Reduzir o estresse e a ansiedade, e até mesmo aliviar a dor. O nosso Home Spray de Menta é feito com óleos essenciais de menta, cânfora e lavanda, que proporcionam um aroma agradável e envolvente, com efeitos benéficos para a saúde e o bem-estar.', nome: 'Home Spray Menta', originalPrice: 'R$ 35,00', discountPrice: 'R$ 29,90' },
    { image: Aroma5, description: 'Um aroma acolhedor e inspirador que expressa toda a força e amor de uma mãe.', nome: 'Home Spray Illumina', originalPrice: 'R$ 35,00', discountPrice: 'R$ 32,90' },
    { image: Aroma6, description: 'Traga a energia vibrante da Dandara para o seu lar! Um aroma cítrico e frutado, com a doçura da baunilha com folhas de ouro. Composto por óleos essenciais cuidadosamente selecionados, o Home Spray Dandara é perfeito para quem busca um ambiente alegre e revigorante e sentir uma sensação de bem-estar e positividade.', nome: 'Home Spray Dandara', originalPrice: 'R$ 40,00', discountPrice: 'R$34,90' },
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
                <img src={item.image} alt={`aroma${index + 1}`} />
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

export default AromaTerapia;
