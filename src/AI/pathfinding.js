import { STANDDEE_TYPES, TILE_OVERLAY_TYPES, TOKEN_TYPES } from "types";

const findPaths = (grid, startHex, targetHex) => {
  const hexAccessibilityChecker = (trapsAllowed, obstaclesAllowed) => (hex) => {
    const hasEnemy = hex?.standee === STANDDEE_TYPES.Player;
    const isWall = hex.terrain === TILE_OVERLAY_TYPES.Wall;
    const isTrap = hex.token === TOKEN_TYPES.Trap;
    const isObstacle = hex.terrain === TILE_OVERLAY_TYPES.Obstacle;

    return (
      !hasEnemy &&
      !isWall &&
      (!isTrap || trapsAllowed) &&
      (!isObstacle || obstaclesAllowed)
    );
  };

  // DEV NOTE: is this a compelete kluge for finding paths
  //           with and without traps? Could help for flying?
  const pathsWithoutTraps = BreadthFirstSearch(
    grid,
    startHex,
    targetHex,
    hexAccessibilityChecker(false, false)
  );
  const pathsWithTraps = BreadthFirstSearch(
    grid,
    startHex,
    targetHex,
    hexAccessibilityChecker(true, false)
  );

  const uniquePaths = [];
  if (
    pathsWithoutTraps.length === 0 ||
    pathsWithoutTraps.toString() === pathsWithTraps.toString()
  ) {
    uniquePaths.push(pathsWithTraps);
  } else {
    uniquePaths.push(pathsWithoutTraps, pathsWithTraps);
  }

  return uniquePaths;
};

// DEV NOTE: BreadthFirstSearch does not account for difficult terrain
//           tiles (cost 2 movement)
//            -> use Dijkstra’s Algorithm or A*
const BreadthFirstSearch = (
  grid,
  startHex,
  targetHex,
  hexAccessibilityChecker
) => {
  const frontieerQueue = [startHex];
  const pathMap = new Map();
  pathMap.set(startHex, null);

  const notInPathMap = (hex) => !pathMap.has(hex);
  const isDefined = (hex) => typeof hex !== "undefined";

  while (frontieerQueue.length) {
    const currentHex = frontieerQueue[0];

    if (currentHex === targetHex) {
      return pathFromPathMap(pathMap, targetHex);
    }

    const newFrontieer = grid
      .neighborsOf(currentHex)
      .filter(notInPathMap)
      .filter(isDefined)
      .filter(hexAccessibilityChecker);

    frontieerQueue.push(...newFrontieer);

    newFrontieer.forEach((frontieerHex) =>
      pathMap.set(frontieerHex, currentHex)
    );

    frontieerQueue.shift();
  }

  return [];
};

const pathFromPathMap = (pathMap, endHex) => {
  let currentHex = endHex;
  const path = [];

  while (currentHex) {
    path.push(currentHex);
    currentHex = pathMap.get(currentHex);
  }

  return path.reverse();
};

export default findPaths;
