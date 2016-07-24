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

const Neighbors = _enum([
  { name: 'TOP_RIGHT', x: 0, y: -1},
  { name: 'RIGHT', x: 1, y: 0},
  { name: 'BOTTOM_RIGHT', x: 1, y: 1},
  { name: 'BOTTOM_LEFT', x: 0, y: 1},
  { name: 'LEFT', x: -1, y: 0},
  { name: 'TOP_LEFT', x: -1, y: -1},
]);

const NeighborsNeg = _enum([
  { name: 'TOP_RIGHT', x: 1, y: -1},
  { name: 'RIGHT', x: 1, y: 0},
  { name: 'BOTTOM_RIGHT', x: 0, y: 1},
  { name: 'BOTTOM_LEFT', x: -1, y: 1},
  { name: 'LEFT', x: -1, y: 0},
  { name: 'TOP_LEFT', x: 0, y: -1},
])

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
          ? new Piece(Types.WATER, 0) : new Piece();
      }, this);
    }, this);

    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        this.findNeighbors(i, j);
      })
    })

  }

  dfBuild() {
    let origin = Math.floor(this.pieces.length / 2);
    let stepSize = 37;
    origin = this.pieces[origin][origin];
    return this.dfHelp(origin, 0, 0, stepSize);
  }

  dfHelp(origin, index, step, stepSize) {
    if (this.typesAvailable.length === 0 ) return true;
    if (step === this.typesAvailable.length) return false;
    if (origin.isVisited) return;

    let rand;
    if (index === 0) rand = Math.floor(Math.random() * this.typesAvailable.length);
    else rand = index;

    let check = true;

    for (let i = 0; i < origin.neighbors.length; i++) {
      if (this.typesAvailable[rand] === origin.neighbors.type) check = false;
    }

    if (check) {
      console.log(step);
      origin.type = this.typesAvailable[rand];
      this.typesAvailable = this.typesAvailable.splice(rand, 1);
      origin.neighbors.forEach(neighbor => {
        this.dfHelp(neighbor, 0, 0, stepSize);
      });
    } else {
      return this.dfHelp(origin, (index + stepSize) % this.typesAvailable.size , step, stepSize);
    }


  }

  findNeighbors(i, j) {
    Neighbors.enumerate().forEach(neighbor => {
      let yOffset = i > this.pieces.length / 2 ? i + NeighborsNeg[neighbor].y : i + Neighbors[neighbor].y;
      let xOffset = j > this.pieces.length / 2 ? j + NeighborsNeg[neighbor].x : j + Neighbors[neighbor].x;
      if (yOffset >= 0 && yOffset < this.pieces.length && xOffset >= 0 && xOffset < this.pieces[yOffset].length
        && this.pieces[yOffset][xOffset]) {

        this.pieces[i][j].neighbors.push(this.pieces[yOffset][xOffset]);
      }
    });
  }


  setNumbers() {
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2,0 ];
  }

  setTypes() {
    this.typesAvailable = [
      this.makeTileCounter(4, Types.WHEAT),
      this.makeTileCounter(4, Types.SHEEP),
      this.makeTileCounter(4, Types.WOOD),
      this.makeTileCounter(3, Types.BRICK),
      this.makeTileCounter(3, Types.ORE),
      //this.makeTileCounter(1, Types.DESERT),
    ].map(arr => {
      let temp = [];
      for (let i = 0; i < arr.count; i++) {
        temp.push(arr.type);
      }
      return temp;
    }).reduce((prev, curr) => prev.concat(curr));
  }

  //helper method used to instantiate set of Types
  makeTileCounter(count, type) {
    return { count, type };
  }

  checkNeighbors(cb) {

    let enums = Neighbors.enumerate();
    for (let i = 1; i < this.pieces.length - 1; i++) {
      let bool;
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        for (let k = 0; k < this.pieces[i][j].neighbors.length; k++) {
          bool = cb(i, j, Neighbors[enums[k]]);
          if (!bool) return false;
        }

      //  for (let k = 0; k < enums.length; k++) {
      //    bool = cb(i, j, Neighbors[enums[k]]);
      //    if (!bool) return false;
      //  }
        //enums = enums.map(neighbor => cb(i, j, Neighbors[neighbor]));
        //if (enums.includes(false)) return false;
      }
    }
    return true;
  }

  checkNumbers() {
    return this.checkNeighbors((i, j, neighbor) => {
      let piece = this.pieces[i][j];
      let yOffset = i > this.pieces.length / 2 ? - neighbor.y : neighbor.y
      let neighborPiece = this.pieces[i + yOffset][j + neighbor.x];
      if (piece && neighborPiece && neighborPiece.type !== Types.WATER
        //&& piece.number && neighborPiece.number
      ) {
        return !((piece.number === 6 || piece.number === 8) &&
          (neighborPiece.number === 6 || neighborPiece.number === 8));
      } return true;
    });
  }

  checkTypes() {
    return this.checkNeighbors((i, j, neighbor) => {
      let piece = this.pieces[i][j];
      let yOffset = i > this.pieces.length / 2 ? - neighbor.y : neighbor.y
      let neighborPiece = this.pieces[i + yOffset][j + neighbor.x];
      if (neighborPiece && neighborPiece.type !== Types.WATER && piece && neighborPiece
        //&& piece.type && neighborPiece.type
      ) {
        return piece.type !== neighborPiece.type;
      } return true;
    });
  }


  shufflePieces() {
    this.typesAvailable.shuffleSort();
  }


  shuffleNumbers() {
    this.numbers.shuffleSort();
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
    do {
      this.setNumbers();
      this.randomNumbers();
    } while (!this.checkNumbers());

    let test;
    do {
      this.setTypes();
      //test = this.dfBuild();
      this.randomizeTypes();
      test = this.checkTypes();
    } while (!test);
    console.log(this.pieces);
    //} while (!this.checkTypes());
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
    this.neighbors = [];
    this.visited = false;
  }

  //implement recursive checking strategy

}
