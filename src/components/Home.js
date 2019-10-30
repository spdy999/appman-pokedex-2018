import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PokemonModal from './PokemonModal';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import PokemonCard from './PokemonCard';
import { getLocalStorageItem } from '../utils/calculation';

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
    // height: 768,
    'justify-content': 'space-between',
    // 'align-content': 'space-between',

    // maxHeight: 768,
    // // height: 768,
    // maxWidth: 1024,
    // width: 1024,
    // overflow: 'auto',
    // alignContent: 'center',
  },
  card: {
    width: 480,
    height: 300,
    marginBottom: 30,
    backgroundColor: '#e4e4e4',
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    'justify-content': 'flex-start',
  },
  cardImg: {
    height: 300,
  },
  add: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    'justify-content': 'flex-end',
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
}));

export default function Home() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [pokedex, onChangePokedex] = useState([]);

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

  return (
    <div>
      <Paper
        style={{
          maxHeight: 768,
          height: 768,
          maxWidth: 1024,
          width: 1024,
          overflow: 'auto',
          alignContent: 'center',
        }}
      >
        <GridList cellHeight={160} className={classes.gridList} cols={2}>
          {pokedex.map(pokemon => (
            <PokemonCard pokemon={pokemon} useStyles={useStyles} />
          ))}
        </GridList>
        <button type="button" onClick={handleOpen}>
          Open Modal
        </button>
      </Paper>
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
