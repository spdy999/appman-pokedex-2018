import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Home = () => {
  const [cards, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await Axios.get(
        'http://localhost:3030/api/cards',
      );
      const cards = fetchedPokemons.data.cards;
      setPokemon(cards);
    }
    fetchData();
  }, []);

  return (
    <div>
      {cards.map(pokemon => (
        <li>{JSON.stringify(pokemon)}</li>
      ))}
    </div>
  );
};

export default Home;
