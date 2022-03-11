import * as Honeycomb from "honeycomb-grid";

import { STANDDEE_TYPES, TOKEN_TYPES } from "../../types";

import hexProps from "./hexProps";

// TODO: make util
const tileAugmenter = (grid, augmentObject, keyName, keyType) => {
  grid[keyName] = [];
  Object.entries(augmentObject).forEach(([key, { x, y, ...restProps }]) => {
    const hex = grid.get([x, y]);
    grid[keyName].push(hex);
    hex.set({ x, y, [keyName]: keyType, label: key, ...restProps });
  });
};

const makeScenrio = ({
  title,
  orientation,
  description,
  height,
  width,
  monsters = {},
  players = {},
  traps = {},
  terrain = {},
}) => {
  const Hex = Honeycomb.extendHex({
    ...hexProps,
    orientation,
  });

  const Grid = Honeycomb.defineGrid(Hex);
  const grid = Grid.rectangle({ width, height });

  grid.title = title;
  grid.description = description;

  tileAugmenter(grid, monsters, "standee", STANDDEE_TYPES.Monster);
  tileAugmenter(grid, players, "standee", STANDDEE_TYPES.Player);
  tileAugmenter(grid, traps, "token", TOKEN_TYPES.Trap); // TODO: call this an overlay not token

  Object.entries(terrain).forEach(([terrain, coords]) => {
    coords.forEach(({ x, y }) => {
      grid.get([x, y]).set({ x, y, terrain });
    });
  });

  grid.getMonsterByLabel = (label) => {
    return {x:1, y:1};
  }

  return grid;
};

export default makeScenrio;
