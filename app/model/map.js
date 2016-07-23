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

<<<<<<< HEAD
=======
Array.prototype.shuffleSort = function() {
  for (let i = 1; i < this.length; i++) {
    let swap = Math.floor( Math.random() * this.length - i ) + i;
    let swapVal = this[i - 1];
    this[i - 1] = this[swap];
    this[swap] = swapVal;
  }
}
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04

export class Map {

  constructor() {

    //Tracks the number of hexes available per type
    this.typesAvailable = [
      this.makeTileCounter(4, Types.WHEAT),
      this.makeTileCounter(4, Types.SHEEP),
      this.makeTileCounter(4, Types.WOOD),
      this.makeTileCounter(3, Types.BRICK),
      this.makeTileCounter(3, Types.ORE),
      this.makeTileCounter(1, Types.DESERT),
    ];

<<<<<<< HEAD
=======
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2 ]

>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
    this.typesAvailable = this.initializeArrayOfPieces();
    console.log(this.availablePieces);

    this.pieces = [
           [0, 0, 0, 0],
         [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
           [0, 0, 0, 0],
    ];

    this.initializeWaterPieces();

    //let centerRow = this.pieces[this.pieces.length / 2];
    //this.center = centerRow[centerRow.length / 2]; //center piece of hex board
  }

  //helper method used to instantiate
  makeTileCounter(count, type) {
    return { count, type };
  }

  initializeWaterPieces() {
    for (let i = 0; i < this.pieces.length; i++) {
      for (let j = 0; j < this.pieces[i].length; j++) {
        if (i == 0 || j == 0 || i == this.pieces.length - 1
          || j == this.pieces[i].length - 1) {
          this.pieces[i][j] = new Piece(Types.WATER);
        }
      }
    }
  }

  initializeArrayOfPieces() {
    return this.typesAvailable.map(type => {
      let arr = [];
      for (let i = 0; i < type.count; i++) {
        arr = arr.concat(new Piece(type.type))
      }
      return arr;
    })
    .reduce((first, second) => { return first.concat(second) });
  }

  shufflePieces() {
<<<<<<< HEAD
    console.log(this.typesAvailable.length);
    for (let i = 1; i < this.typesAvailable.length; i++) {
      let swap = Math.floor(Math.random() * (this.typesAvailable.length - i)) + i;

      console.log(swap);
      let swapVal = this.typesAvailable[swap];
      this.typesAvailable[swap] = this.typesAvailable[i - 1];
      this.typesAvailable[i - 1] = swapVal;
    }
    console.log('hello world');
    console.log(this.typesAvailable);
  }

  randomDistro() {
    //offset by 1 on either side to ignore water pieces
    this.shufflePieces();
    for (let i = 1; i < this.pieces.length - 1; i++) {
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        this.pieces[i][j] = this.typesAvailable.pop();
      }
    }
=======
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
        func(to, fr, i, j);
      }
    }
  }

  randomizeTypes() {
    this.shufflePieces();
    this.distribute(this.typesAvailable, this.pieces, (fr, to, i, j) => {
      fr[i][j] = to.pop();
    });

  }

  randomNumbers() {
    this.shuffleNumbers();
    this.distribute(this.numbers, this.pieces, (fr, to, i, j) => {
      if (fr[i][j].type != Types.DESERT) {
        fr[i][j].number = to.pop();
      }
    });
  }

  randomDistro() {
    this.randomizeTypes();
    this.randomNumbers();
    console.log(this.pieces);
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
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

  constructor(type) {
    this.type = type;
<<<<<<< HEAD
=======
    this.number = 0;
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
  }

}
