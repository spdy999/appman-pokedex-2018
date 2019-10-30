import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { calData } from '../utils/calculation';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
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
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Paper style={{ maxHeight: 768, maxWidth: 1024, overflow: 'auto' }}>
      <List dense className={classes.root}>
        {pokemonData.map(pokemon => {
          const labelId = `checkbox-list-secondary-label-${pokemon.id}`;
          return (
            <ListItem key={pokemon.id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${pokemon.id + 1}`}
                  src={pokemon.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${pokemon.name}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(pokemon)}
                  checked={checked.indexOf(pokemon) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
