import * as Honeycomb from "honeycomb-grid";

import { STANDDEE_TYPES, TOKEN_TYPES } from "../types";

import focusFinder from "ai/focusFinder";
import { hexProps } from "./common";

export const makeScenrio = ({
  title,
  orientation,
  description,
  height,
  width,
  monsters = {},
  players = {},
  traps = {},
  notations = {},
  terrain = {},
}) => {
  const Hex = Honeycomb.extendHex({
    ...hexProps,
    orientation,
    findFocus({ range = 1, targetCount = 1 }) {
      return ai.findFocus(this, { range, targetCount });
    },
    findFocusOptions({ range = 1, targetCount = 1 }) {
      return ai.findFocusOptions(this, { range, targetCount });
    },
  });

  const Grid = Honeycomb.defineGrid(Hex);
  const grid = Grid.rectangle({ width, height });
  const ai = focusFinder(grid);

  grid.title = title;
  grid.description = description;
  grid.playerHexes = Object.values(players).map((v) => grid.get(v));
  grid.monsterHexes = Object.values(monsters).map((v) => grid.get(v));
  grid.trapHexes = Object.values(traps).map((v) => grid.get(v));
  grid.notationHexes = Object.values(notations).map((v) => grid.get(v));

  grid.getMonster = (label) =>
    grid.monsterHexes.find((monster) => monster.label === label);

  const tileAugmenter = (augmentObject, keyName, keyType) => {
    Object.entries(augmentObject).forEach(([key, { x, y, ...restProps }]) => {
      grid
        .get([x, y])
        .set({ x, y, [keyName]: keyType, label: key, ...restProps });
    });
  };

  tileAugmenter(monsters, "standee", STANDDEE_TYPES.Monster);
  tileAugmenter(players, "standee", STANDDEE_TYPES.Player);
  tileAugmenter(traps, "token", TOKEN_TYPES.Trap); // TODO: call this an overlay not token
  tileAugmenter(notations, "token", TOKEN_TYPES.Notation);

  Object.entries(terrain).forEach(([terrain, coords]) => {
    coords.forEach(({ x, y }) => {
      grid.get([x, y]).set({ x, y, terrain });
    });
  });

  return grid;
};
