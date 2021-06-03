import { TILE_OVERLAY_TYPES } from "types";
import makeScenrio from "scenrios/util/makeScenrio";

// scenrios from
// https://online.flippingbook.com/view/598058/30/

export const example1 = makeScenrio({
  title: "rulebook p30 ex1",
  description:
    "Example comes from the rule book p30 ex1. This scenrio demonstrates that even though a player my be closer in an absolute measurement; monsters will consider the effect things like traps have on the possible attack paths.",
  orientation: "flat",
  width: 9,
  height: 7,
  monsters: {
    M1: { x: 3, y: 2 },
    M2: { x: 3, y: 3 },
  },
  players: {
    P1: { x: 3, y: 4, iniative: 1 },
    P2: { x: 6, y: 4, iniative: 2 },
  },
  traps: {
    T1: { x: 2, y: 4 },
    T2: { x: 4, y: 4 },
  },
  notations: {
    a: { x: 2, y: 5 },
    b: { x: 5, y: 3 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Wall]: [
      // west wall
      ...Array(7)
        .fill()
        .map((_, i) => ({ x: 0, y: i })),

      // east wall
      ...Array(7)
        .fill()
        .map((_, i) => ({ x: 8, y: i })),

      // north wall
      ...Array(7)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 0 })),

      // south wall
      ...Array(7)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 6 })),
    ],
  },
});

// -----------------------

export const example2 = makeScenrio({
  title: "rulebook p30 ex2",
  orientation: "pointy",
  width: 6,
  height: 6,
  monsters: {
    M1: { x: 1, y: 1 },
  },
  players: {
    P1: { x: 2, y: 3, iniative: 1 },
    P2: { x: 3, y: 4, iniative: 2 },
    P3: { x: 4, y: 2, iniative: 3 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Wall]: [
      // west wall
      ...Array(6)
        .fill()
        .map((_, i) => ({ x: 0, y: i })),

      // east wall
      ...Array(6)
        .fill()
        .map((_, i) => ({ x: 5, y: i })),

      // north wall
      ...Array(4)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 0 })),

      // south wall
      ...Array(4)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 5 })),
    ],
  },
});

// -----------------------

export const example3 = makeScenrio({
  title: "rulebook p31 ex1",
  orientation: "pointy",
  width: 9,
  height: 5,
  monsters: {
    M1: { x: 4, y: 2 },
  },
  players: {
    P1: { x: 2, y: 1, iniative: 1 },
    P2: { x: 6, y: 3, iniative: 2 },
  },
  traps: {
    T1: { x: 3, y: 1 },
    T2: { x: 3, y: 2 },
    T3: { x: 2, y: 3 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Wall]: [
      // west wall
      ...Array(5)
        .fill()
        .map((_, i) => ({ x: 0, y: i })),

      // east wall
      ...Array(5)
        .fill()
        .map((_, i) => ({ x: 8, y: i })),

      // north wall
      ...Array(8)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 0 })),

      // south wall
      ...Array(8)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 4 })),
    ],
  },
});

// -----------------------

export const example4 = makeScenrio({
  title: "rulebook p31 ex2",
  orientation: "pointy",
  width: 9,
  height: 5,
  monsters: {
    M1: { x: 6, y: 1 },
    M2: { x: 6, y: 2 },
  },
  players: {
    P1: { x: 2, y: 1, iniative: 1 },
    P2: { x: 2, y: 2, iniative: 2 },
  },
  traps: {
    T1: { x: 4, y: 1 },
    T2: { x: 5, y: 1 },
  },
  terrain: {
    [TILE_OVERLAY_TYPES.Wall]: [
      // west wall
      ...Array(5)
        .fill()
        .map((_, i) => ({ x: 0, y: i })),

      // north wall
      ...Array(8)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 0 })),

      // south wall
      ...Array(8)
        .fill()
        .map((_, i) => ({ x: i + 1, y: 4 })),
    ],
  },
});
