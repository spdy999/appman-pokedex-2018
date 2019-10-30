import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PokemonModal from './PokemonModal';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import PokemonCard from './PokemonCard';
import {
  getLocalStorageItem,
  deletePokemon,
  setLocalStorageItem,
} from '../utils/calculation';
import { colors } from '../constants/constants';

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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  gridList: {
    'justify-content': 'space-between',
  },
  card: {
    width: 480,
    height: 300,
    marginBottom: 30,
    backgroundColor: colors.cardBackground,
  },
  deleteButton: {
    color: colors.colorAddButton,
  },
  openModalButton: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bottomBarBackground,
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    'justify-content': 'flex-start',
  },
  cardImg: {
    height: 300,
  },
  footer: {
    height: '10%',
    backgroundColor: colors.bottomBarBackground,
  },
  cardHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    'justify-content': 'space-between',
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  wrapper: {
    height: 768,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [pokedex, onChangePokedex] = useState([]);
  const [deletedPokemon, setDeletedPokemon] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const localStoragePokedex = getLocalStorageItem('pokedex');
    onChangePokedex(localStoragePokedex || []);
  }, []);

  useEffect(() => {
    if (deletedPokemon) {
      debugger;
      const localStoragePokedex = getLocalStorageItem('pokedex');
      const del = deletePokemon(localStoragePokedex, deletedPokemon);
      onChangePokedex(del);
      setLocalStorageItem('pokedex', del);
      debugger;
    }
    debugger;
  }, [deletedPokemon]);

  return (
    <div className={classes.wrapper}>
      <Paper
        style={{
          height: '90%',
          maxWidth: 1024,
          width: 1024,
          overflowY: 'auto',
          overflowX: 'hidden',
          alignContent: 'center',
        }}
      >
        <GridList cellHeight={160} className={classes.gridList} cols={2}>
          {pokedex.map(pokemon => (
            <PokemonCard
              pokemon={pokemon}
              useStyles={useStyles}
              deleteButton
              setDeletedPokemon={setDeletedPokemon}
            />
          ))}
        </GridList>
      </Paper>
      <footer className={classes.footer}>
        <button
          type="button"
          onClick={handleOpen}
          className={classes.openModalButton}
        >
          +
        </button>
      </footer>
      {open && (
        <PokemonModal
          classes={classes}
          open={open}
          handleClose={handleClose}
          modalStyle={modalStyle}
          onChangePokedex={onChangePokedex}
        />
      )}
    </div>
  );
}
