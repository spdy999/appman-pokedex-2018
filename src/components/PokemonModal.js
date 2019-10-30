import * as R from 'ramda';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import {
  calData,
  calFreePokemon,
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/calculation';
import PokemonCard from './PokemonCard';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 768,
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PokemonModal(props) {
  const { open, handleClose, modalStyle, onChangePokedex } = props;
  const [cards, setCards] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [freePokemon, setFreePokemon] = useState([]);
  const [addedPokemon, addPokemon] = useState({});

  useEffect(() => {
    Axios.get('http://localhost:3030/api/cards').then(res => {
      setCards(res.data.cards);
      debugger;
    });
  }, []);

  useEffect(() => {
    const mapPokemonData = cards.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      ...calData(pokemon),
    }));
    setPokemonData(mapPokemonData);
    debugger;
  }, [cards]);

  useEffect(() => {
    const pokedex = getLocalStorageItem('pokedex') || [];
    // debugger;
    setFreePokemon(
      pokedex.length === 0 ? pokemonData : calFreePokemon(pokemonData, pokedex),
    );
    // debugger;
  }, [pokemonData]);

  useEffect(() => {
    const pokedex = getLocalStorageItem('pokedex') || [];
    if (!R.isEmpty(addedPokemon)) {
      setLocalStorageItem('pokedex', [...pokedex, addedPokemon]);
      // const freePokemons = calFreePokemon(freePokemon, [addedPokemon]);
      setFreePokemon(calFreePokemon(freePokemon, [addedPokemon]));
      onChangePokedex([...pokedex, addedPokemon]);
    }
  }, [addPokemon, addedPokemon]);

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
            {freePokemon.map(pokemon => {
              return (
                <ListItem key={pokemon.id}>
                  <PokemonCard
                    pokemon={pokemon}
                    addPokemon={addPokemon}
                    addButton
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </Modal>
  );
}
