import React from 'react';
import Card from '@material-ui/core/Card';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   card: {
//     width: 768,
//     backgroundColor: '#f3f4f7',
//   },
//   cardAction: {
//     display: 'flex',
//     flexDirection: 'row',
//     'justify-content': 'flex-start',
//   },
//   cardImg: {
//     height: 300,
//   },
//   add: {
//     display: 'flex',
//     width: '100%',
//     flexDirection: 'row',
//     'justify-content': 'flex-end',
//   },
//   content: {
//     display: 'flex',
//     width: '100%',
//     flexDirection: 'column',
//   },
// }));

const PokemonCard = props => {
  const { pokemon, addPokemon, addButton, useStyles } = props;

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.cardAction}>
        <div>
          <img
            alt={`Avatar n°${pokemon.id + 1}`}
            src={pokemon.imageUrl}
            className={classes.cardImg}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.add}>
            {addButton && (
              <button
                onClick={() => {
                  addPokemon(pokemon);
                }}
              >
                ADD+
              </button>
            )}
          </div>
          <h2>{pokemon.name}</h2>
          <div>
            <p>hp {pokemon.hp}</p>
            <p>str {pokemon.strength}</p>
            <p>weak {pokemon.weakness}</p>
            <p>happiness {pokemon.happiness}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;
