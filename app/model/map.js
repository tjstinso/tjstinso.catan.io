export class Map {

  constructor() {

    this.types = {
      wheat: 4,
      sheep: 4,
      wood: 4,
      brick: 3,
      ore: 3,
      desert: 1,
    };

    this.pieces = [
           [0, 0, 0, 0],
         [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
           [0, 0, 0, 0],
    ];
  }

  getPieces() {
    return this.pieces;
  }

}


export class Piece {

  constructor(type) {

  }

}
