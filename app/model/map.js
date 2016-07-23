<<<<<<< HEAD
export class Map {

  constructor() {
    this.pieces = [
      [0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
=======
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
  }

  fairRandomDistro() {

  }



  traverseMap() {

  }

  traverseMapHelp(root) {

>>>>>>> 20aa2940d911c886c733119dca60788119191abf
  }

  getPieces() {
    return this.pieces;
  }

}

<<<<<<< HEAD
export class Piece {
  
  constructor() {

=======

export class Piece {

  constructor(type) {
    this.type = type;
>>>>>>> 20aa2940d911c886c733119dca60788119191abf
  }

}
