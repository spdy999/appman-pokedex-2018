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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const [cards, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPokemons = await Axios.get(
        'http://localhost:3030/api/cards',
      );
      const cards = fetchedPokemons.data.cards;
      console.log(cards);

      setPokemon(cards);
    }
    fetchData();
  }, []);
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
        {cards.map(card => {
          const labelId = `checkbox-list-secondary-label-${card.id}`;
          return (
            <ListItem key={card.id} button>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${card.id + 1}`} src={card.imageUrl} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${card.name}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(card)}
                  checked={checked.indexOf(card) !== -1}
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
