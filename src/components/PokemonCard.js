import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    width: 768,
    backgroundColor: '#f3f4f7',
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    'justify-content': 'flex-start',
  },
  cardImg: {
    height: 300,
  },
}));

const PokemonCard = props => {
  const { pokemon } = props;

  const classes = useStyles();
  return (
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
          <Typography variant="body2" color="textSecondary" component="p">
            <div>hp {pokemon.hp}</div>
            <div>str {pokemon.strength}</div>
            <div>weak {pokemon.weakness}</div>
            <div>happiness {pokemon.happiness}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
