import { TILE_OVERLAY_TYPES } from "../../types";
import { makeScenrio } from "../util";

// scenrios from
// https://boardgamegeek.com/geeklist/234575/gloomhaven-rules-quiz

export const scenrio1 = makeScenrio({
  title: "BGG scenrio 1",
  orientation: "flat",
  width: 5,
  height: 6,
  monsters: {
    M1: { x: 2, y: 1 },
    M2: { x: 2, y: 2 },
    M3: { x: 2, y: 3 },
  },
  players: {
    P1: { x: 2, y: 4, iniative: 1 },
  },
  notations: {
    a: { x: 1, y: 1 },
    b: { x: 3, y: 1 },
  },
});

// -----------------------------------------------------------------------

export const scenrio2 = makeScenrio({
  title: "BGG scenrio 2",
  orientation: "flat",
  width: 5,
  height: 7,
  monsters: {
    M1: { x: 2, y: 1 },
    M2: { x: 2, y: 2 },
    M3: { x: 2, y: 3 },
  },
  players: {
    P1: { x: 2, y: 5, iniative: 1 },
  },
  notations: {
    a: { x: 1, y: 1 },
    b: { x: 3, y: 1 },
  },
});

// -----------------------------------------------------------------------

export const scenrio3 = makeScenrio({
  title: "BGG scenrio 3",
  orientation: "flat",
  width: 6,
  height: 5,
  monsters: {
    M1: { x: 1, y: 1 },
  },
  players: {
    P1: { x: 1, y: 3, iniative: 1 },
    P2: { x: 4, y: 3, iniative: 2 },
  },
  notations: {
    a: { x: 0, y: 3 },
    b: { x: 2, y: 3 },
    c: { x: 3, y: 2 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Obstacle]: [{ x: 1, y: 2 }],
  },
});

// -----------------------------------------------------------------------

export const scenrio4 = makeScenrio({
  title: "BGG scenrio 4",
  orientation: "flat",
  width: 7,
  height: 5,
  monsters: {
    M1: { x: 2, y: 2 },
    M2: { x: 3, y: 2 },
    M3: { x: 4, y: 3 },
  },
  players: {
    P1: { x: 5, y: 3, iniative: 1 },
  },
  traps: {
    T1: { x: 3, y: 1 },
  },
  notations: {
    a: { x: 2, y: 3 },
    b: { x: 4, y: 1 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Wall]: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },

      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 6, y: 2 },
      { x: 6, y: 3 },
      { x: 6, y: 4 },

      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
      { x: 5, y: 4 },
    ],
    [TILE_OVERLAY_TYPES.Obstacle]: [
      { x: 4, y: 2 },
      { x: 3, y: 3 },
    ],
  },
});

// -----------------------------------------------------------------------

export const scenrio5 = makeScenrio({
  title: "BGG scenrio 5",
  orientation: "flat",
  width: 9,
  height: 7,
  monsters: {
    M1: { x: 3, y: 2 },
    M2: { x: 4, y: 3 },
    M3: { x: 5, y: 3 },
  },
  players: {
    P1: { x: 6, y: 4, iniative: 1 },
  },
  traps: {
    T1: { x: 1, y: 1 },
  },
  notations: {
    a: { x: 2, y: 2 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Obstacle]: [
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },

      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 4 },
      { x: 6, y: 5 },
    ],
  },
});
