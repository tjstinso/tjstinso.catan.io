import _enum from './enum';

const env = process.env.NODE_ENV;
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
]);

Array.prototype.shuffleSort = function() {
  for (let i = 0; i < this.length - 1; i++) {
    let swap = Math.floor( Math.random() * this.length - i ) + i;
    let swapVal = this[i];
    this[i] = this[swap];
    this[swap] = swapVal;
  }
}

export class Map {

  constructor() {

    this.count = 0;

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
          ? new Piece(Types.WATER, -1) : new Piece();
      }, this);
    }, this);

    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        this.findNeighbors(i, j);
      })
    })

  }


  findNeighbors(i, j) {

    Neighbors.enumerate().forEach(neighbor => {
      let yOffset;
      let xOffset;

      if (i === Math.floor(this.pieces.length / 2) && (neighbor == Neighbors.BOTTOM_LEFT
          || neighbor == Neighbors.BOTTOM_RIGHT)) {
        yOffset = i + NeighborsNeg[neighbor].y;
        xOffset = j + NeighborsNeg[neighbor].x;
      } else if (i > Math.floor(this.pieces.length / 2)) {
        yOffset = i + NeighborsNeg[neighbor].y;
        xOffset = j + NeighborsNeg[neighbor].x;
      } else {
        yOffset = i + Neighbors[neighbor].y;
        xOffset = j + Neighbors[neighbor].x;
      }

      if (yOffset >= 0 && yOffset < this.pieces.length && xOffset >= 0 && xOffset < this.pieces[yOffset].length) {
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
    ]
    .map(arr => {
      let temp = [];
      for (let i = 0; i < arr.count; i++) {
        temp = temp.concat(arr.type);
      }
      return temp;
    })
    .reduce((prev, curr) => prev.concat(curr)); //flatten array into list of types
  }

  //helper method used to instantiate set of Types
  makeTileCounter(count, type) {
    return { count, type };
  }

  checkNeighbors(cb) {

    for (let i = 1; i < this.pieces.length - 1; i++) {
      for (let j = 1; j < this.pieces[i].length - 1; j++) {

        //iterate over neighbor nodes
        for (let k = 0; k < this.pieces[i][j].neighbors.length; k++) {
          if (!cb(this.pieces[i][j], this.pieces[i][j].neighbors[k])) {
            //if (env == 'test') console.log(this.pieces[i][j]);
            return false;
          }
        }

      }
    }
    return true;
  }

  checkNumbers() {
    return this.checkNeighbors((piece, neighbor) => {
      return !((piece.number === 6 || piece.number === 8) &&
        (neighbor.number === 6 || neighbor.number === 8));
    });
  }

  checkTypes() {
    return this.checkNeighbors((piece, neighbor) => {
      return piece['type'] !== neighbor['type'];
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

  clearField(field) {
    for (let i = 1; i < this.pieces.length - 1; i++) {
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        this.pieces[i][j][field] = null;
      }
    }
  }

  randomizeTypes() {
    this.shufflePieces();
    this.distribute(this.typesAvailable, this.pieces, (fr, to, i, j) => {

      //this.pieces[i][j].type = null;
      if (to[i][j].number === 0 || this.typesAvailable.length === 0) {
        to[i][j].type = Types.DESERT;
      } else {
        to[i][j].type = fr.pop();
      }

      //} else if (this.typesAvailable.length > 0){
      //  to[i][j].type = fr.pop();
      //}

    });
  }

  setRandomDesert() {}

  randomNumbers() {
    this.shuffleNumbers();
    this.distribute(this.numbers, this.pieces, (fr, to, i, j) => {
      to[i][j].number = fr.pop();
    });
  }

  randomDistro() {
    this.count = 0;
    do {
      this.setNumbers();
      this.randomNumbers();
      if (env == 'test') this.count++;
    } while (!this.checkNumbers());

    let test = false;
    do {
      this.setTypes();
      this.randomizeTypes();

      //if (env == 'test')
      //if (this.count > 30000) console.log(this);
      this.count++;

    } while (!this.checkTypes());
    console.log(this.pieces);
    console.log(this.count);
  }

  fairRandomDistro() {

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

if (env == 'test') {
  let map = new Map()
  let total = 0;
  let i;
  for (i = 0; i < 1000; i++) {
    map.randomDistro()
    total += map.count;
    map = new Map();
  }
  console.log(total / i);
}

if (env == 'checkType') {
  let map = new Map();
  for (let i = 0; i < 1000; i++) {
    map.setNumbers();
    map.randomNumbers()
    map.setTypes();
    map.randomizeTypes()
    let arr = map.pieces.reduce((prev, curr) => prev.concat(curr));
    arr = arr.map(piece => piece.type);
    console.log(arr);
  }
  //console.log(map);
}
