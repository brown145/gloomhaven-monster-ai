class DumbAI {
  constructor(scenrio){
    this.scenrio = scenrio;
  }

  static sortMonsterPathPreference(pathA, pathB){
    // lets not actually sort
    return 1;
  }

  findFocus(source, actions){
    // lets just return the first player
    return this.scenrio.players.all[0];
  }

  findPaths(source, actions, target) {
    // how is a single straight line?
    let paths = [];
    const linePath = this.scenrio.grid.hexesBetween(source, target);
    paths.push(linePath.slice(1, linePath.length -1));
    return paths.sort(DumbAI.sortMonsterPathPreference);
  }

  findMovementPaths(source, actions, target) {
    // lets just move on found path
    const paths = this.findPaths(source, actions, target);
    const bestPathReverse = paths[0].reverse();
    const movements = actions.filter(action => action.hasOwnProperty("move"));
    let movementPaths = [];

    movements.forEach(({move}) => {
      const movementPath = [];
      for(let i = 0; i < move; i++) {
        if (bestPathReverse.length) {
          movementPath.push(bestPathReverse.pop());
        }
      }
      
      movementPaths.push(movementPath);
    })
    
    return movementPaths;
  }

  findAttackTargets(source, actions, target){
    const focus = this.findFocus();
    return [focus];
  }
}

export default DumbAI;
