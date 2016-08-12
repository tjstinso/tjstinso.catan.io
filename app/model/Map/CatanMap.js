import { GameMap, Piece } from './map';
import _enum from '../../utilities/enum';

export const Types = _enum([
  'WHEAT',
  'SHEEP',
  'WOOD',
  'BRICK',
  'ORE',
  'DESERT',
  'WATER'
]);


export class CatanMap extends GameMap {
  constructor(diameter) {
    super(diameter);

    this.types = Types;
    this.numbers = [];
    this.typesAvailable = [];
    this.docks = [];


    //initialize array of dock types and shuffle array
    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
    //.map((dock, i) => i < 5 ? DockType["2:1"] : DockType["3:1"]).shuffleSort();
    this.initPieces();
    super.initNeighbors();
  }

  initPieces() {
    this.pieces = this.pieces.map((row, i) => {
      return row.map((column, j) => {
        let point = this.pieces[i][j];
        if (i === 0 || j === 0 || i === (this.pieces.length - 1) || j === (this.pieces[i].length - 1)) {
          return new CatanPiece(Types.WATER, -1, point);
        } else {
          return new CatanPiece(null, -1, point);
        }
      }, this);
    }, this);
  }

  setNumbers() {
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2,0 ];
  }

  //Initialization code: randomize the palcement of docks amongst water pieces
  randomizeDocks() {

    //initialize array of dock types and shuffle array
    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
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

    //create a new set of pieces: replace those that have been flagged with docks
    this.pieces = this.pieces.map(row => row.map(piece => piece.flag ? new Dock(this.docks.pop()) : piece));

    //calculate dock direction
    this.pieces.forEach((row, i) => row.forEach((piece, j) => {
      if (piece instanceof Dock) piece.calcDir(j, i, this);
    }));

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


  shufflePieces() {
    this.typesAvailable.shuffleSort();
  }
  //Initialization code
  //helper method used to instantiate set of Types
  makeTileCounter(count, type) {
    return { count, type };
  }

  checkNumbers() {
    return super.checkNeighbors((piece, neighbor) => {
      return !((piece.number === 6 || piece.number === 8) &&
        (neighbor.number === 6 || neighbor.number === 8));
    });
  }

  checkTypes() {
    return super.checkNeighbors((piece, neighbor) => {
      return piece['type'] !== neighbor['type'];
    });
  }

  randomizeTypes() {
    this.shufflePieces();
    super.distribute(this.typesAvailable, this.pieces, (fr, to, i, j) => {

      if (to[i][j].number === 0 || this.typesAvailable.length === 0) {
        to[i][j].type = Types.DESERT;
      } else {
        to[i][j].type = fr.pop();
      }

    });
  }

  shuffleNumbers() {
    this.numbers.shuffleSort();
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

    do {
      this.randomizeDocks();
    } while(false);


  }
}

class CatanPiece extends Piece {
  constructor(type = null, number = 0, point) {
    super(point);
    this.type = type;
    this.number = number;
  }
}

class Land extends CatanPiece {
  constructor(type = null, number = 0, point) {
    super(null, 0, point);
    this.type = type;
    this.number = number;
  }
}

class Dock extends CatanPiece {
  constructor(dockType, point) {
    super(Types.WATER, -1, point);
    this.dockType = dockType;
    this.dockDir = null;
  }

  calcDir(x, y, map) {
    if (y === 0) {
      if (x < map.pieces[y].length / 2) {
        this.dockDir = map.Dir.BOTTOM_RIGHT;
      } else {
        this.dockDir = map.Dir.BOTTOM_LEFT;
      }
    } else if (y === map.pieces.length - 1) {
      if (x < map.pieces[y].length / 2) {
        this.dockDir = map.Dir.TOP_RIGHT;
      } else {
        this.dockDir = map.Dir.TOP_LEFT;
      }
    } else if (map.pieces[y].length - 2 > map.pieces.length / 2) {
      if (x === 0) {
        this.dockDir = map.Dir.RIGHT;
      } else {
        this.dockDir = map.Dir.LEFT;
      }
    } else if (x === 0) {
      if (y < map.pieces.length / 2) {
        this.dockDir = map.Dir.BOTTOM_RIGHT;
      } else {
        this.dockDir = map.Dir.TOP_RIGHT;
      }
    } else {
      if (y < map.pieces.length / 2) {
        this.dockDir = map.Dir.BOTTOM_LEFT;
      } else {
        this.dockDir = map.Dir.TOP_LEFT;
      }
    }

  }
}
