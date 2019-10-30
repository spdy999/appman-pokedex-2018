import * as R from 'ramda';

export const getLocalStorageItem = name => {
  return JSON.parse(localStorage.getItem(name));
};

export const setLocalStorageItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj));
};

export const calFreePokemon = (fetchPokemons, pokedex) => {
  const pokedexGroup = R.groupBy(pk => pk.id, pokedex);
  return fetchPokemons.filter(fetchPokemon => !pokedexGroup[fetchPokemon.id]);
};

export const deletePokemon = (localStoragePokemon, deletedPokemon) => {
  return localStoragePokemon.filter(
    pokemon => pokemon.id !== deletedPokemon.id,
  );
};
const calHp = hp => (hp >= 100 ? 100 : 0);

const calStrength = (attacks = []) => {
  const strength = attacks.length * 50;
  return strength <= 100 ? strength : 100;
};
const calWeakness = weakness => {
  return weakness.length === 1 ? 100 : 0;
};
const calDamage = attacks => {
  const damages = attacks.map(att => att.damage);
  const damageVal = damages.map(damage => damage.replace(/\D/g, ''));
  const sumDam = damageVal.reduce((sum, damVal) => sum + damVal, 0);
  return sumDam;
};
const calHappiness = (hp, dam, wn) => (hp / 10 + dam / 10 + 10 - wn) / 5;
// ((hp / 10) * (dam / 10) + 10 - wn) / 5;

export const calData = pokemon => {
  // debugger;
  const hp = calHp(pokemon.hp);
  const strength = calStrength(pokemon.attacks || []);
  const weakness = calWeakness(pokemon.weaknesses || []);
  const damage = calDamage(pokemon.attacks || []);
  const happiness = calHappiness(hp, damage, weakness);
  return {
    hp,
    strength,
    weakness,
    damage,
    happiness,
  };
};
