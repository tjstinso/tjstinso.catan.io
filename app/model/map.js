import _enum from './enum';
//Generate constants
export const Types = _enum([
  'WHEAT',
  'SHEEP',
  'WOOD',
  'BRICK',
  'ORE',
  'DESERT',
  'WATER'
]);

export const Neighbors = _enum([
  { name: 'TOP_RIGHT', x: 0, y: -1},
  { name: 'RIGHT', x: 1, y: 0},
  { name: 'BOTTOM_RIGHT', x: 1, y: 1},
  { name: 'BOTTOM_LEFT', x: 0, y: 1},
  { name: 'LEFT', x: -1, y: 0},
  { name: 'TOP_LEFT', x: -1, y: -1},
]);


Array.prototype.shuffleSort = function() {
  for (let i = 1; i < this.length; i++) {
    let swap = Math.floor( Math.random() * this.length - i ) + i;
    let swapVal = this[i - 1];
    this[i - 1] = this[swap];
    this[swap] = swapVal;
  }
}

export class Map {

  constructor() {

    //Tracks the number of hexes available per type

    this.numbers = [];
    this.typesAvailable = [];

    this.pieces = [
           [0, 0, 0, 0],
         [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
           [0, 0, 0, 0]
    ];

    this.pieces = this.pieces.map((row, i) => {
      return row.map((column, j) => {
        return i === 0 || j === 0 || i === this.pieces.length - 1 || j === this.pieces[i].length - 1
          ? new Piece(Types.WATER) : new Piece();
      }, this);
    }, this);

  }


  setNumbers() {
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2 ];
  }

  setTypes() {
    this.typesAvailable = [
      this.makeTileCounter(4, Types.WHEAT),
      this.makeTileCounter(4, Types.SHEEP),
      this.makeTileCounter(4, Types.WOOD),
      this.makeTileCounter(3, Types.BRICK),
      this.makeTileCounter(3, Types.ORE),
      this.makeTileCounter(1, Types.DESERT),
    ].map(arr => {
      let temp = [];
      for (let i = 0; i < arr.count; i++) {
        temp = temp.concat(arr.type);
      }
      return temp;
    }).reduce((prev, curr) => prev.concat(curr));
  }

  checkNeighbors(cb) {
    for (let i = 1; i < this.pieces.length - 1; i++) {
      let enums;
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        enums = Neighbors.enumerate();
        enums = enums.map(neighbor => cb(i, j, Neighbors[neighbor]));
        if (enums.includes(false)) return false;
      }
    }
    console.log(this.pieces);
    return true;
  }

  checkNumbers() {
    return this.checkNeighbors((i, j, neighbor) => {
      let piece = this.pieces[i][j];
      let yOffset = i > this.pieces.length / 2 ? - neighbor.y : neighbor.y
      let neighborPiece = this.pieces[i + yOffset][j + neighbor.x];
      if (piece && neighborPiece && piece.number && neighborPiece.number) {
        return !((piece.number === 6 || piece.number === 8) &&
          (neighborPiece.number === 6 || neighborPiece.number === 8));
      } else {
        return true;
      }
    });
  }

  checkTypes() {
    return this.checkNeighbors((i, j, neighbor) => {
      let piece = this.pieces[i][j];
      let yOffset = i > this.pieces.length / 2 ? - neighbor.y : neighbor.y
      let neighborPiece = this.pieces[i + yOffset][j + neighbor.x];
      if (piece && neighborPiece && piece.type && neighborPiece.type) {
        return piece.type !== neighborPiece.type;
      } else {
        return true;
      }
    });
  }

  //helper method used to instantiate
  makeTileCounter(count, type) {
    return { count, type };
  }

  shufflePieces() {
    this.typesAvailable.shuffleSort();
  }

  shuffleNumbers() {
    this.numbers.shuffleSort();
  }

  addChits() {

  }

  distribute(fr, to, func) {
    for (let i = 1; i < to.length - 1; i++) {
      for (let j = 1; j < to[i].length - 1; j++) {
        func(fr, to, i, j);
      }
    }
  }

  randomizeTypes() {
    this.shufflePieces();
    this.distribute(this.typesAvailable, this.pieces, (fr, to, i, j) => {
      if (to[i][j].number === 0) {
        to[i][j].type = Types.DESERT;
      } else to[i][j].type = fr.pop();
    });
  }

  randomNumbers() {
    this.shuffleNumbers();
    this.distribute(this.numbers, this.pieces, (fr, to, i, j) => {
      if (to[i][j].type !== Types.DESERT) {
        to[i][j].number = fr.pop();
      }
    });
  }

  randomDistro() {
    let test;
    do {
      this.setNumbers();
      this.randomNumbers();
      test = this.checkNumbers();
    } while (!test);

    do {
      this.setTypes();
      this.randomizeTypes();
      test = this.checkTypes();
      console.log(test);
    } while (!test);
  }

  fairRandomDistro() {

  }



  traverseMap() {

  }

  traverseMapHelp(root) {

  }

  getPieces() {
    return this.pieces;
  }

}


export class Piece {

  constructor(type = null, number = 0) {
    this.type = type;
    this.number = number;
  }

}
