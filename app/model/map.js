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
  { name: 'TOP_RIGHT', x: 0, y: -1},
  { name: 'RIGHT', x: 1, y: 0},
  { name: 'BOTTOM_RIGHT', x: 1, y: 1},
  { name: 'BOTTOM_LEFT', x: 0, y: 1},
  { name: 'LEFT', x: -1, y: 0},
  { name: 'TOP_LEFT', x: -1, y: -1},
]);

export const NeighborsNeg = _enum([
  { name: 'TOP_RIGHT', x: 1, y: -1},
  { name: 'RIGHT', x: 1, y: 0},
  { name: 'BOTTOM_RIGHT', x: 0, y: 1},
  { name: 'BOTTOM_LEFT', x: -1, y: 1},
  { name: 'LEFT', x: -1, y: 0},
  { name: 'TOP_LEFT', x: 0, y: -1},
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

export class Map {

  constructor() {

    this.Neighbors = Neighbors;

    this.NeighborsNeg = NeighborsNeg;

    this.Dir = Dir;

    this.pieces = [
           [0, 0, 0, 0],
         [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
           [0, 0, 0, 0]
    ];

  }

  initNeighbors() {
    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        //if (piece instanceof Dock) piece.calcDir(j, i, this);
        this.findNeighbors(i, j);
      })
    });
  }


  //Initialization code
  initPieces() {
    this.pieces = this.pieces.map((row, i) => {
      return row.map((column, j) => {
        if (i === 0 || j === 0 || i === (this.pieces.length - 1) || j === (this.pieces[i].length - 1)) {
          return new Piece(Types.WATER, -1);
        } else {
          return new Piece(null, -1);
        }
      }, this);
    }, this);
  }

  //find all neighbors of piece at location[i][j]
  findNeighbors(i, j) {

    this.Neighbors.enumerate().forEach(neighbor => {
      let yOffset;
      let xOffset;

      if (i === Math.floor(this.pieces.length / 2) && (neighbor == Dir.BOTTOM_LEFT
          || neighbor == Dir.BOTTOM_RIGHT)) {
        yOffset = i + this.NeighborsNeg[neighbor].y;
        xOffset = j + this.NeighborsNeg[neighbor].x;
      } else if (i > Math.floor(this.pieces.length / 2)) {
        yOffset = i + this.NeighborsNeg[neighbor].y;
        xOffset = j + this.NeighborsNeg[neighbor].x;
      } else {
        yOffset = i + this.Neighbors[neighbor].y;
        xOffset = j + this.Neighbors[neighbor].x;
      }

      if (yOffset > 0 && yOffset < this.pieces.length - 1 && xOffset > 0 && xOffset < this.pieces[yOffset].length - 1) {
        this.pieces[i][j].neighbors.push(this.pieces[yOffset][xOffset]);
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

  constructor() {
    this.neighbors = [];
  }

}
