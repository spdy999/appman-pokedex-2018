import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PokemonModal from './PokemonModal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import PokemonCard from './PokemonCard';
import { getLocalStorageItem } from '../utils/calculation';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Home() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [pokedex, setPokedex] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const localStoragePokedex = getLocalStorageItem('pokedex');
    setPokedex(localStoragePokedex || []);
  }, []);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>

      <Paper
        style={{
          maxHeight: 768,
          maxWidth: 1024,
          overflow: 'auto',
          alignContent: 'center',
        }}
      >
        <List>
          {pokedex.map(pokemon => {
            return (
              <ListItem key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
      {open && (
        <PokemonModal
          classes={classes}
          open={open}
          handleClose={handleClose}
          modalStyle={modalStyle}
        />
      )}
    </div>
  );
}
