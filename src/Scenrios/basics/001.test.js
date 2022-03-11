import DumbAI from "../../AI/DumbAI";
import Scenrio from "../util/Scenrio";
import data from "./001.json";

describe("base data", () => {
  test("has metadata", () => {
    expect(data.title).toEqual(expect.any(String));
    expect(data.description).toEqual(expect.any(String));
    expect(data.source).toEqual(expect.any(String));
  });

  test("has map data", () => {
    expect(data.orientation).toEqual(expect.any(String));
    expect(data.width).toEqual(expect.any(Number));
    expect(data.height).toEqual(expect.any(Number));
    expect(data.monsters).toEqual(expect.any(Object));
    expect(data.players).toEqual(expect.any(Object));
  });
});

describe("generated scenrio", () => {
  const scenrio = new Scenrio(data, DumbAI);

  test("get by label", () => {
    expect(scenrio.getMonsterByLabel("M1")).toMatchObject({x:1, y:1});
    expect(scenrio.getPlayerByLabel("P1")).toMatchObject({x:4, y:4});
  });

  test("find monster focus", () => {
    const monster = scenrio.getMonsterByLabel("M1");
    const player = scenrio.getPlayerByLabel("P1");
    const actions = [ {move:2}, {attack:2} ];
    
    expect(monster.findFocus(actions)).toMatchObject(player);
  });

  test("find monster paths", () => {
    const monster = scenrio.getMonsterByLabel("M1");
    const player = scenrio.getPlayerByLabel("P1");
    const actions = [ {move:2}, {attack:2} ];
    const paths = monster.findPaths(actions, player);
    const bestPath = paths[0];
    
    expect(paths).toHaveLength(1);
    expect(bestPath[0]).toMatchObject({x:2, y:2})
    expect(bestPath).toHaveLength(3);
  });

  test("find monster movement", () => {
    const monster = scenrio.getMonsterByLabel("M1");
    const player = scenrio.getPlayerByLabel("P1");
    const actions = [ {move:2}, {attack:2} ];
    const paths = monster.findMovementPaths(actions, player);
    const path = paths[0];
    
    expect(paths).toHaveLength(1);
    expect(path).toHaveLength(2);
    expect(path[0]).toMatchObject({x:2, y:2})
    expect(path[1]).toMatchObject({x:3, y:2})
  });

  test("find monster attack target(s)", () => {
    const monster = scenrio.getMonsterByLabel("M1");
    const player = scenrio.getPlayerByLabel("P1");
    const actions = [ {move:2}, {attack:2} ];
    const targets = monster.findAttackTargets(actions, player);
    
    expect(targets).toHaveLength(1);
    expect(targets[0]).toBe(player)
  });
});
