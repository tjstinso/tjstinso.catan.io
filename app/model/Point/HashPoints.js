export class HashPoints {
  constructor(pieces) {
    this.map = new Map();
    this.hashNodes(pieces);
  }

  //flatten array and add to hashmap
  //to be called in constructor
  hashNodes(nodes) {
    nodes.reduce((prev, curr) => prev.concat(curr))
    .forEach(node => this.addToMap(node));
  }

  //Return 
  getPointFromMap(point) {
    let key = this.hash(point);
    //console.log(key);
    //console.log(this.map);
    if (!this.map.get(key)) {
      return null
    }

    while (!this.map.get(key).point.isEqual(point)) {
      key++;
    }
    return this.map.get(key);
  }

  addToMap(piece) {
    let key = this.hash(piece.point);
    while (this.map.get(key)) { //all points on map should be unique
      key++;
    }
    this.map.set(key, piece);
  }

  hash(point) {
    return (point.y << 16) ^ point.x;
  }

  getMap() {
    return this.map;
  }
}

