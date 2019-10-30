import React from 'react';
import Card from '@material-ui/core/Card';

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
          <div className={classes.cardHeader}>
            <h2>{pokemon.name}</h2>
            {addButton && (
              <h2
                className={classes.addButton}
                onClick={() => {
                  addPokemon(pokemon);
                }}
              >
                ADD+
              </h2>
            )}
          </div>
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
