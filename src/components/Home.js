import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { calData } from '../utils/calculation';
import PokemonCard from './PokemonCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 768,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const [cards, setCards] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await Axios.get(
        'http://localhost:3030/api/cards',
      );

      setCards(fetchedPokemons.data.cards);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const mapPokemonData = cards.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      ...calData(pokemon),
    }));
    setPokemonData(mapPokemonData);
  }, [cards]);

  const classes = useStyles();
  return (
    <Paper style={{ maxHeight: 768, maxWidth: 1024, overflow: 'auto' }}>
      <List dense className={classes.root}>
        {pokemonData.map(pokemon => {
          return (
            <ListItem key={pokemon.id} button>
              <PokemonCard pokemon={pokemon} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
