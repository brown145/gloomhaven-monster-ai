import findPaths from "./pathfinding";
import isHexOccupiable from "./util/isHexOccupiable";
import isHexOccupied from "./util/isHexOccupied";
import isHexTrapped from "./util/isHexTrapped";

/*

  Monster Focus

  Before preforming any action on their ability card, each individual monster will focus on a 
  specific enemy either a character or a summon.

  A monster will focus on the enemy figure it can preform its current attack against using the 
  least amount of movement. It finds the shortest possible path to get in range and line-of-sight 
  to use its attack, and the figure that can be attacked at the end of that path is the focus. 
  This enemy figure is considered the "closest." It doesn't matter if the monster can't get within 
  range. If a monster does not have an attack listed on its ability card for the round, it finds a 
  focus as if it had a melee attack. In the case where the monster can move the same number of 
  spaces to get within range (and line-of-sight) of multiple enemy figures (eg because it starts 
  its tufn within range of multiple enemies), proximity from the monster's current position (ie 
  number of hexes they are away, not counting through walls) is then checked as a tie-breaker 
  for determining "closest."

  If more than one enemy ties for being the closest, the second priority is to focus on the enemy 
  who is earlier in the initave order...

  In the case where there is no valid targets on which to focus, because there are not valid hexes 
  a monster could attack from (ex...), regardless of the number of hexes it could move, a monster 
  will not move or attack on its turn but it will preform any other of its actions...


 */

export const setHexFocus = (grid, hex, actions) => {
  hex.focusPsudoAttack = findFocusedAttack(actions);
  hex.rankedPaths = findRankedAttackPlans(grid, hex, hex.focusPsudoAttack);
  hex.focus = hex.rankedPaths[0]?.targetHex || null;

  return hex;
};

const findFocusedAttack = (actions) => {
  const firstAttackAction = actions.find((action) => !!action.attack) || {};
  return {
    attack: 1,
    range: 1,
    ...firstAttackAction,
  };
};

const findRankedAttackPlans = (grid, monsterHex, { range = 1 }) => {
  const allAttackPlans = []; // [ { targetHex, fromHex, path } ]

  grid.playerHexes.forEach((playerHex) => {
    findTargetAttackableCoords(playerHex, range).forEach((fromHex) => {
      findPaths(grid, monsterHex, fromHex).forEach((path) => {
        const attackPlan = { targetHex: playerHex, fromHex, path };
        if (!allAttackPlans.includes(attackPlan))
          allAttackPlans.push(attackPlan);
      });
    });
  });

  const rankedAttackPlans = allAttackPlans.sort((rhs, lhs) => {
    return sortMonsterPathingPreference(rhs.path, lhs.path);
  });

  return rankedAttackPlans;
};

const findTargetAttackableCoords = (grid, target, range) => {
  return grid
    .hexesInRange(grid.get(target), range)
    .filter(isHexOccupied)
    .filter(isHexOccupiable);
};
