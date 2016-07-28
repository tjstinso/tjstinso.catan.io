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

export const Dir = _enum([
  'BOTTOM_RIGHT',
  'BOTTOM_LEFT',
  'TOP',
  'BOTTOM',
  'TOP_RIGHT',
  'TOP_LEFT',
  'RIGHT',
  'LEFT',
])

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

    //initialize array of dock types and shuffle array
    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
    //.map((dock, i) => i < 5 ? DockType["2:1"] : DockType["3:1"]).shuffleSort();

    this.initPieces();
    this.setDocks();

    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (piece instanceof Dock) piece.calcDir(j, i, this);
        this.findNeighbors(i, j);
      })
    })


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




  //Initialization code
  setNumbers() {
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2,0 ];
  }

  //Initialization code
  setDocks() {
    let docks = [];
    //push first row
    docks.push.apply(docks, this.pieces[0]);

    //push right column
    for (let i = 1; i < this.pieces.length - 1; i++) {
      let j = this.pieces[i].length - 1;
      docks.push(this.pieces[i][j]);
    }

    //push bottom row: reverse
    for (let i = this.pieces[this.pieces.length - 1].length - 1; i >= 0; i--) {
      docks.push(this.pieces[this.pieces.length - 1][i]);
    }
    //docks.push.apply(docks, this.pieces[this.pieces.length - 1]);

    //push left column
    for (let i = this.pieces.length - 2; i > 0; i--) {
      docks.push(this.pieces[i][0]);
    }

    //either 1st or second block
    let chance = Math.floor(Math.random() * 2);
    for (let i = chance; i < docks.length; i+=2) docks[i].flag = true;
    console.log(docks);

    //create a new set of pieces: replace those that have been flagged with docks
    this.pieces = this.pieces.map(row => row.map(piece => piece.flag ? new Dock(this.docks.pop()) : piece));
  }

  //Initialization code
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

  //Initialization code
  //helper method used to instantiate set of Types
  makeTileCounter(count, type) {
    return { count, type };
  }

  //find all neighbors of piece at location[i][j]
  findNeighbors(i, j) {

    Neighbors.enumerate().forEach(neighbor => {
      let yOffset;
      let xOffset;

      if (i === Math.floor(this.pieces.length / 2) && (neighbor == Dir.BOTTOM_LEFT
          || neighbor == Dir.BOTTOM_RIGHT)) {
        yOffset = i + NeighborsNeg[neighbor].y;
        xOffset = j + NeighborsNeg[neighbor].x;
      } else if (i > Math.floor(this.pieces.length / 2)) {
        yOffset = i + NeighborsNeg[neighbor].y;
        xOffset = j + NeighborsNeg[neighbor].x;
      } else {
        yOffset = i + Neighbors[neighbor].y;
        xOffset = j + Neighbors[neighbor].x;
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


  randomizeTypes() {
    this.shufflePieces();
    this.distribute(this.typesAvailable, this.pieces, (fr, to, i, j) => {

      if (to[i][j].number === 0 || this.typesAvailable.length === 0) {
        to[i][j].type = Types.DESERT;
      } else {
        to[i][j].type = fr.pop();
      }

    });
  }

  randomNumbers() {
    this.shuffleNumbers();
    this.distribute(this.numbers, this.pieces, (fr, to, i, j) => {
      to[i][j].number = fr.pop();
    });
  }

  randomDistro() {
    if (process.env.NODE_ENV === 'test') this.count = 0;
    do {
      this.setNumbers();
      this.randomNumbers();
      //if (process.env.NODE_ENV === 'test') this.count++;
    } while (!this.checkNumbers());


    let test = false;
    do {
      this.setTypes();
      this.randomizeTypes();
      if (process.env.NODE_ENV === 'test') this.count++;
    } while (!this.checkTypes());
    console.log(this.pieces);
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
  }

  //implement recursive checking strategy

}


export class Dock extends Piece {
  constructor(dockType) {
    super(Types.WATER, -1);
    this.dockType = dockType;
    this.dockDir = null;
  }

  calcDir(x, y, map) {
    if (y === 0) {
      if (x < map.pieces[y].length / 2) {
        this.dockDir = Dir.BOTTOM_RIGHT;
      } else {
        this.dockDir = Dir.BOTTOM_LEFT;
      }
    } else if (y === map.pieces.length - 1) {
      if (x < map.pieces[y].length / 2) {
        this.dockDir = Dir.TOP_RIGHT;
      } else {
        this.dockDir = Dir.TOP_LEFT;
      }
    } else if (map.pieces[y].length - 2 > map.pieces.length / 2) {
      if (x === 0) {
        this.dockDir = Dir.RIGHT;
      } else {
        this.dockDir = Dir.LEFT;
      }
    } else if (x === 0) {
      if (y < map.pieces.length / 2) {
        this.dockDir = Dir.BOTTOM_RIGHT;
      } else {
        this.dockDir = Dir.TOP_RIGHT;
      }
    } else {
      if (y < map.pieces.length / 2) {
        this.dockDir = Dir.BOTTOM_LEFT;
      } else {
        this.dockDir = Dir.TOP_LEFT;
      }
    }

  }
}
