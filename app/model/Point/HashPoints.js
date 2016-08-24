export class HashPoints {
  constructor(pieces) {
    this.map = new Map();
    this.hashNodes(pieces);
  }

  //flatten array and add to hashmap
  //to be called in constructor
  hashNodes(nodes) {
    nodes.forEach((row, i) => {
      row.forEach((piece, j) => {
        this.addToMap(piece.point, i, j);
      })
    })
  }

  //Return 
  getPointFromMap(point, pieces) {
    const indexes = this.map.get(JSON.stringify(point));
    if (indexes) {
      let { i, j } = indexes;
      return pieces[i][j];
    }
    return null;
  }

  addToMap(point, i, j) {
    this.map.set(JSON.stringify(point), {i, j});
  }

  getMap() {
    return this.map;
  }
}

