import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { calData } from '../utils/calculation';
import PokemonCard from './PokemonCard';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 768,
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    position: 'absolute',
    width: 800,
    // alignContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PokemonModal(props) {
  const { open, handleClose, modalStyle } = props;
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
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Search...</h2>
        <Paper
          style={{
            maxHeight: 500,
            maxWidth: 1024,
            overflow: 'auto',
            alignContent: 'center',
          }}
        >
          <List>
            {pokemonData.map(pokemon => {
              return (
                <ListItem key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </Modal>
  );
}
