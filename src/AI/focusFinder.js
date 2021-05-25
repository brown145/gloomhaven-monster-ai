import findPaths from "./pathfinding";
import isHexOccupiable from "./util/isHexOccupiable";
import isHexOccupied from "./util/isHexOccupied";
import isHexTrapped from "./util/isHexTrapped";

const scope = (grid) => {
  const findAllAttackPlans = (monsterHex, { range = 1 }) => {
    const allAttackPlans = []; // [ { targetHex, fromHex, path } ]

    grid.playerHexes.forEach((playerHex) => {
      getTargetAttackableCoords(playerHex, range).forEach((fromHex) => {
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

  const findFocusOptions = (monsterHex, attack) => {
    const attackPlans = findAllAttackPlans(monsterHex, attack);

    const rankedTargets = attackPlans.reduce((acc, plan) => {
      if (!acc.includes(plan.targetHex)) {
        acc.push(plan.targetHex);
      }
      return acc;
    }, []);

    const allPaths = attackPlans.map((plan) => plan.path);

    const targetMapPath = attackPlans.reduce((acc, { targetHex, path }) => {
      const paths = acc.get(targetHex) || [];
      acc.set(targetHex, [...paths, path]);

      return acc;
    }, new Map());

    const focusOptions = {
      rankedTargets,
      allPaths,
      targetMapPath,
    };

    return focusOptions;
  };

  const findFocus = (monsterHex, attack) => {
    const attackPlans = findAllAttackPlans(monsterHex, attack);
    return attackPlans[0]?.targetHex;
  };

  const getTargetAttackableCoords = (target, range) => {
    return grid
      .hexesInRange(grid.get(target), range)
      .filter(isHexOccupied)
      .filter(isHexOccupiable);
  };

  const sortMonsterPathingPreference = (aPath, bPath) => {
    // DEV NOTE: this may need to be enhanced
    // Sorting may differ for finding focus and finding movement path

    /* Focus AI
     * 1. avoid traps
     * 2. fewest moves to be in range
     * 3. lowest initiate opponent
     * */

    /* Movement AI
     * 1. hit focus
     * 2. avoid traps
     * 3. avoid disadvantage
     * 4. hit maximum number of targets
     * 5a. move fewest spaces to get in range
     * 6b. move closer to opponent (if cannot get in range)
     * */

    // right now we are only finding focus with #2 and #5

    const aHasTrap = aPath.some(isHexTrapped);
    const bHasTrap = bPath.some(isHexTrapped);

    if ((aHasTrap && bHasTrap) || (!aHasTrap && !bHasTrap)) {
      return aPath.length - bPath.length;
    }

    if (aHasTrap) {
      return 1;
    }

    return -1;
  };

  return { findFocus, findFocusOptions };
};

export default scope;
