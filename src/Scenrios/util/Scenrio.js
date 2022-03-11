import * as Honeycomb from "honeycomb-grid";

import hexProps from "./hexProps";

class Scenrio {
  constructor({
    title = "No Title",
    orientation = "flat",
    description = "No Description",
    height = 1,
    width = 1,
    monsters = {},
    players = {},
    traps = {},
    terrain = {},
  }, AI) {
    const Hex = Honeycomb.extendHex({
      ...hexProps,
      orientation,
    });
  
    const Grid = Honeycomb.defineGrid(Hex);

    this.title = title;
    this.description = description;
    this.grid = Grid.rectangle({ width, height });
    this.ai = new AI(this);
    
    this.monsters = { all: [], byLabel: {} };
    const monsterEntries = Object.entries(monsters);
    const addMonsterStandeeFromEntry = ([key, data]) => this.addMonster.call(this, key, data);
    monsterEntries.forEach(addMonsterStandeeFromEntry);

    this.players = { all: [], byLabel: {} };
    const playerEntries = Object.entries(players);
    const addPlayerStandeeFromEntry = ([key, data]) => this.addPlayer.call(this, key, data);
    playerEntries.forEach(addPlayerStandeeFromEntry);
  }

  static xyToXandY(xy) {
    let [x, y] = xy.split(",");

    x = Number(x);
    y = Number(y);

    return {x, y}
  }

  static registerHex(hexStore, label, hex) {
    hexStore.all.push(hex);
    hexStore.byLabel[label] = hex;
  }

  static getRegisteredHex(hexStore, label) {
    return hexStore.byLabel[label];
  }

  addMonster(label, { xy }) {
    const coords = Scenrio.xyToXandY(xy);
    const hex = this.grid.get(coords);

    const focusFinder = (...args) => this.findMonsterFocus(hex, ...args);
    const pathsFinder = (...args) => this.findMonsterPaths(hex, ...args);
    const movementPathsFinder = (...args) => this.findMonsterMovementPaths(hex, ...args);
    const attackTargetsFinder = (...args) => this.findMonsterAttackTargets(hex, ...args);

    hex.label = label;
    hex.findFocus = focusFinder;
    hex.findPaths = pathsFinder;
    hex.findMovementPaths = movementPathsFinder;
    hex.findAttackTargets = attackTargetsFinder;
    
    Scenrio.registerHex(this.monsters, label, hex);
  }

  getMonsterByLabel(label) {
    return Scenrio.getRegisteredHex(this.monsters, label);
  }

  addPlayer(label, { xy, iniative }) {
    const coords = Scenrio.xyToXandY(xy);
    const hex = this.grid.get(coords);

    hex.label = label;
    hex.iniative = iniative;
    
    Scenrio.registerHex(this.players, label, hex);
  }

  getPlayerByLabel(label) {
    return Scenrio.getRegisteredHex(this.players, label);
  }

  findMonsterFocus(monster, actions) {
    return this.ai.findFocus(monster, actions);
  }

  findMonsterPaths(monster, actions, target) {
    return this.ai.findPaths(monster, actions, target);
  }

  findMonsterMovementPaths(monster, actions, target) {
    return this.ai.findMovementPaths(monster, actions, target);
  }

  findMonsterAttackTargets(monster, actions, target) {
    return this.ai.findAttackTargets(monster, actions, target);
  }
}

export default Scenrio;
