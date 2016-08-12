import _enum from './enum';

const env = process.env.NODE_ENV;

export const Dir = _enum([
  'BOTTOM_RIGHT',
  'BOTTOM_LEFT',
  'TOP_RIGHT',
  'TOP_LEFT',
  'RIGHT',
  'LEFT',
])

export const Neighbors = _enum([
  { name: 'TOP_RIGHT', x: -1, y: 1 },
  { name: 'RIGHT', x: 0, y: 1 },
  { name: 'BOTTOM_RIGHT', x: 1, y: 0 },
  { name: 'BOTTOM_LEFT', x: 1, y: -1 },
  { name: 'LEFT', x: 0, y: -1 },
  { name: 'TOP_LEFT', x: -1, y: 0 },
]);

const DockType = _enum([
  "3:1",
  "2:1",
]);

Array.prototype.shuffleSort = function() {
  for (let i = this.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}

class Point {
  constructor(x ,y) {
    this.x = x;
    this.y = y;
  }

  isEqual(point) {
    return this.x === point.x && this.y === point.y;
  }
}

/**
 *  Represent a 3d point on a hex board
 */
class ThreeDHexPoint extends Point {
  constructor(point) {
    super(point.x, point.y);
    this.z = -x - y;
  }

  isEqual(point) {
    return super.isEqual(point) && this.z === point.z; //this is redundant for hex case
  }
}

//Given a list of points, return a new list of 3DHexPoints.
function convertTo3D(points) {
  return points.map(row => {
    return row.map(node => {
      return new ThreeDHexPoint(node);
    });
  });
}

//Build a list of Points based a diameter.
class HashPoints {
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


export class GameMap {

  constructor(diameter) {
    this.Neighbors = Neighbors;
    this.Dir = Dir;
    this.pieces = this.buildNodes(diameter);
    this.hashmap = {};
  }


  buildNodes(diameter) {
    let nodes = [];
    for (let i = -Math.floor(diameter / 2); i <= Math.floor(diameter / 2); i++) { //outer handles x value
      let minY;
      let width = diameter - Math.abs(i);
  
      if (i < 0) {
        minY = -Math.floor(diameter / 2) - i; //0, -1, -2, etc...
      } else {
        minY = -Math.floor(diameter / 2); 
      }
  
      for (let j = minY; j < width - Math.abs(minY); j++) {
        if (i + Math.floor(diameter / 2) >= nodes.length) nodes.push([]);
        nodes[i + Math.floor(diameter / 2)][j - minY] = new Point(i, j);
      }
    }
    return nodes;
  }

  initNeighbors() {
    this.hashmap = new HashPoints(this.pieces);
    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        //if (piece instanceof Dock) piece.calcDir(j, i, this);
        this.findNeighbors(i, j);
      })
    });
  }


  //find all neighbors of piece at location[i][j]
  findNeighbors(i, j) {
    this.Neighbors.enumerate().forEach(neighbor => {
      let yOffset;
      let xOffset;
      let piece = this.pieces[i][j];
      let point = new Point(piece.point.x + this.Neighbors[neighbor].x, piece.point.y + this.Neighbors[neighbor].y);
      let check = this.hashmap.getPointFromMap(point);
      if (check !== null) {
        this.pieces[i][j].neighbors.push(check);
      }
    });
  }

  checkNeighbors(cb) {

    for (let i = 1; i < this.pieces.length - 1; i++) {
      for (let j = 1; j < this.pieces[i].length - 1; j++) {

        //iterate over neighbor nodes
        for (let k = 0; k < this.pieces[i][j].neighbors.length; k++) {
          if (!cb(this.pieces[i][j], this.pieces[i][j].neighbors[k])) {
            return false;
          }
        }

      }
    }
    return true;
  }

  distribute(fr, to, func) {
    for (let i = 1; i < to.length - 1; i++) {
      for (let j = 1; j < to[i].length - 1; j++) {
        func(fr, to, i, j);
      }
    }
  }

  getPieces() {
    return this.pieces;
  }

}


export class Piece {

  constructor(point) {
    this.neighbors = [];
    this.point = point;
  }

  isEqual(piece) {
    return this.point.x === piece.point.x && this.point.y === piece.point.y;
  }

}
