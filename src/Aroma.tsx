import React, { useState } from 'react';
import './Aroma.css';
import Aroma1 from './Assets/Aroma1.jpeg';
import Aroma2 from './Assets/Aroma2.jpeg';
import Aroma3 from './Assets/Aroma3.jpeg';
import Aroma4 from './Assets/Aroma4.jpeg';
import '@fortawesome/fontawesome-free/css/all.css';

interface AromaProps {
  addToCart: (itemIndex: number) => void;
}

const AromaTerapia: React.FC<AromaProps> = ({ addToCart }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const items = [
    { image: Aroma1, description: 'Descrição do Aroma 1', nome: 'Home Spray Okê Arô', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma2, description: 'Descrição do Aroma 2', nome: 'Home Spray Odoyá SPA', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma3, description: 'Descrição do Aroma 3', nome: 'Home Spray Limão do Vale', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
    { image: Aroma4, description: 'Descrição do Aroma 4', nome: 'Home Spray Menta', text: 'Valor', clique: 'Descrição', comprar: 'Comprar' },
  ];

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(index)
        ? prevFavorites.filter(favIndex => favIndex !== index)
        : [...prevFavorites, index]
    );
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
                className={`heart-icon ${favorites.includes(index) ? 'favorite' : ''}`}
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
