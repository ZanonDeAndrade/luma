import React, { useState } from 'react';
import './Aroma.css';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';
import Aroma5 from './Assets/Aroma5.jpeg';
import Aroma6 from './Assets/Aroma6.jpeg';
import '@fortawesome/fontawesome-free/css/all.css';

interface AromaProps {
  addToCart: (itemIndex: number) => void;
  toggleFavorite: (itemIndex: number) => void;
  favoriteItems: number[];
}

const AromaTerapia: React.FC<AromaProps> = ({ addToCart, toggleFavorite, favoriteItems }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const items = [
    { image: Aroma1, description: 'Imagine-se em uma floresta amazônica, com a brisa tropical acariciando sua pele e o aroma da floresta inundando o ar. Inspirado na majestade da floresta amazônica, o Okê Arô é a maneira perfeita de começar o dia com energia e bem-estar. Sua saída aromática é refrescante, com notas verdes e cereja.', nome: 'Home Spray Okê Arô', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma2, description: 'Poseidon, o Deus dos mares, em seu Home Spray de 100ml, vem sendo representado por um aroma fresco como o cheiro da chuva.  Remete ao aconchego e  sua indicação é para o uso em dormitórios, devido ao seu forte poder de higienização mental. Conheça a coleção Divinus e descubra o aroma perfeito para você!', nome: 'Home Spray Poseidon', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma3, description: 'Conhecido por suas propriedades revitalizantes e estimulantes. Ele é capaz de despertar os sentidos, melhorar o humor e aumentar a produtividade. O nosso Home Spray Limão do Vale é feito com ingredientes 100% naturais e de alta qualidade. Ele contém notas de limão siciliano, laranja doce, bergamota e capim-limão. ', nome: 'Home Spray Limão do Vale', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma4, description: 'Rico em mentol, um composto que tem efeitos neuroativos, como: Melhorar o foco e a concentração; Reduzir o estresse e a ansiedade, e até mesmo aliviar a dor. O nosso Home Spray de Menta é feito com óleos essenciais de menta, cânfora e lavanda, que proporcionam um aroma agradável e envolvente, com efeitos benéficos para a saúde e o bem-estar.', nome: 'Home Spray Menta', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
  ];

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="container">
      {items.map((item, index) => (
        <div
          key={index}
          className={`item ${flippedIndex === index ? 'flipped' : ''}`}
        >
          <div className="inner">
            <div className="front">
              <div
                className={`heart-icon ${favoriteItems.includes(index) ? 'favorite' : ''}`}
                onClick={() => toggleFavorite(index)}
              >
                <i className="fas fa-heart"></i>
              </div>
              <img src={item.image} alt={`aroma${index + 1}`} />
              <div className='nome'>{item.nome}</div>
              <div className="text">{item.text}</div>
              <div className='clique' onClick={() => handleFlip(index)}>{item.clique}</div>
              <div className='comprar' onClick={() => addToCart(index)}>{item.comprar}</div>
            </div>
            <div className="back">
              <p>{item.description}</p>
              <div className="back-buttons">
                <div className="flip-button" onClick={() => handleFlip(index)}>Voltar</div>
                <div className="cart" onClick={() => addToCart(index)}>Adicionar ao Carrinho</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AromaTerapia;
