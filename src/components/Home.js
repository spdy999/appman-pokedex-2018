import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { calData } from '../utils/calculation';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 768,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    width: 768,
    backgroundColor: '#f3f4f7',
  },
  cardAction: {
    // width: 768,
    display: 'flex',
    flexDirection: 'row',
    'justify-content': 'flex-start',
  },
  media: {
    height: 140,
  },
  cardImg: {
    height: 300,
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
      {/* <List dense className={classes.root}> */}
      <List dense className={classes.root}>
        {pokemonData.map(pokemon => {
          return (
            <ListItem key={pokemon.id} button>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardAction}>
                  <CardContent>
                    <img
                      alt={`Avatar n°${pokemon.id + 1}`}
                      src={pokemon.imageUrl}
                      className={classes.cardImg}
                    />
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {pokemon.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <div>hp {pokemon.hp}</div>
                      <div>str {pokemon.strength}</div>
                      <div>weak {pokemon.weakness}</div>
                      <div>happiness {pokemon.happiness}</div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
