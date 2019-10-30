const calHp = hp => (hp >= 100 ? 100 : 0);

const calStrength = (attacks = []) => {
  debugger;
  const strength = attacks.length * 50;
  return strength <= 100 ? strength : 100;
};
const calWeakness = weakness => {
  const weaknessVal = weakness.length * 100;
  return weaknessVal <= 100 ? weaknessVal : 100;
};
const calDamage = attacks => {
  const damages = attacks.map(att => att.damage);
  const damageVal = damages.map(damage => damage.replace(/\D/g, ''));
  const sumDam = damageVal.reduce((sum, damVal) => sum + damVal, 0);
  return sumDam;
};
const calHappiness = (hp, dam, wn) => ((hp / 10) * (dam / 10) + 10 - wn) / 5;

export const calData = pokemon => {
  debugger;
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
