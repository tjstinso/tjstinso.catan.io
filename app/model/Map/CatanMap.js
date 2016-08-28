import { GameMap, Piece } from './map';
import _enum from '../../utilities/enum';
import { Point } from '../Point/Point'
import { checkUniformity } from './UniformTest';

export const Types = _enum([
  'WHEAT',
  'SHEEP',
  'WOOD',
  'BRICK',
  'ORE',
  'DESERT',
  'WATER',
]);


export class CatanMap extends GameMap {

  constructor(diameter) {
    super(diameter);
    this.types = Types;
    this.numbers = [];
    this.typesAvailable = [];
    this.docks = [];
    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
    this.initPieces();
    this.geoLayout();
    this.initNeighbors(); //need to change to handle rferences instead of unique points
  }

  // Create a mapping from chits to pips
  // Note: Water chits are mapped to 0
  mapChitToPip() {
    let map = new Map();
    let valueList = [0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1,];
    let uniqueList = [-1, 0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12,];
    uniqueList.forEach((val, i) => map.set(val, valueList[i]));
    return map;
  }


  // Check distribution of pips across board
  checkPipUniformity() {

    //helper function to check if dock is facing a piece
    const checkDockDir = (dock, comparePiece) => {
      return dock instanceof Dock && dock.checkNeighbor(dock.dockDir, comparePiece);
    }

    // MATT WHAT DOES THIS DO?
    const cc = val => val * (val - 1) / 2;

    let map = this.mapChitToPip();

    //create hex representation of vertexes
    //check the pip value at each vertex, docks count as 2
    //each vertex is represented only by cc(value of pips in adjacent hexagons)
    let pips = super.getVertexes(arr => {
      return cc(arr.reduce((prev, curr) => {
        if (curr instanceof Dock) {
          let directionCheck = arr.map(piece => checkDockDir(curr, piece));
          if (directionCheck.includes(true)) {
            return prev + 2;
          } else {
            return prev;
          }
        } else {
          return prev + map.get(curr.number);
        }
      }, 0));
    })
    .reduce((prev, curr) => prev.concat(curr)) //reduce to single dimensional array
    .reduce((prev, curr) => prev + curr, 0);// < 1300; //add all pip values to list and compare against val
    //console.log(pips);
    return pips < 1300;
  }

  checkTypeUniformity() {
    const flattenPieces = () => this.pieces.reduce((prev, curr) => prev.concat(curr));

    //list of pieces by terrain
    const terrainList = flattenPieces()
      .map(item => item.type);

    const map = this.mapChitToPip();

    const valueList = flattenPieces()
      .map(item => map.get(item.number));

    const types = [
      Types.WHEAT,
      Types.SHEEP,
      Types.WOOD,
      Types.BRICK,
      Types.ORE,
    ];

    const sum = valueList.reduce((prev, curr) => prev + curr, 0);
    const expected = sum / valueList.filter(item => item !== 0).length;
    let chisq = 0;

    types.forEach((type, i) => {
      let terrainByType = () => terrainList.filter(item => item === type);
      let expec = expected * terrainByType().length;
      let sum = 0;
      terrainList.map((locType, i) => locType === type ? i : null)
        .filter(item => item !== null)
        .forEach(index => {
          sum += valueList[index];
        });
      chisq += Math.pow(sum - expec, 2) / expec;
    });

    return chisq > 1;
  }

  // Initialize piece types.
  // Distribute the types across the board. Does not include docks.
  initPieces() {
    this.pieces = this.pieces.map((row, i) => {
      return row.map((column, j) => {
        let point = this.pieces[i][j];
        if (i === 0 || j === 0 || i === (this.pieces.length - 1) || j === (this.pieces[i].length - 1)) {
          return new CatanPiece(Types.WATER, -1, point);
        } else {
          return new Land(null, -1, point);
        }
      }, this);
    }, this);
  }

  //Set the chit values of the map
  setNumbers() {
    this.numbers = [ 8,8,6,6,12,11,11,10,10,9,9,5,5,4,4,3,3,2,0 ];
  }

  //Initialization code: randomize the palcement of docks amongst water pieces
  randomizeDocks() {

    this.pieces = this.pieces.map((row, i) => row.map((piece, j) => {
      if (piece.type === "WATER") {
        return CatanPiece.copyConstructor(piece);
      } else {
        return piece;
      }
    }));

    let docks = this.getWaterPieces();

    //initialize array of dock types and shuffle array
    this.docks = [Types.WHEAT, Types.BRICK, Types.ORE, Types.WOOD, Types.SHEEP, 1, 1, 1, 1].shuffleSort();
    //either 1st or second block
    let chance = Math.floor(Math.random() * 2);
    for (let i = chance; i < docks.length; i+=2) docks[i].flag = true;

    //create a new set of pieces: replace those that have been flagged with docks
    this.pieces = this.pieces.map(row => row.map(piece => piece.flag ? new Dock(this.docks.pop(), piece.point, piece.geoPoint) : piece));
    
    //calculate dock direction
    this.pieces.forEach((row, i) => row.forEach((piece, j) => {
      if (piece instanceof Dock) piece.calcDir(j, i, this);
    }));
  }

  checkRepeatDocks() {
    let docks = this.getWaterPieces().filter(item => item instanceof Dock);
    for (let i = 0; i < docks.length - 1; i++) {
      if (docks[i].dockType === 1 && docks[i+1].dockType === 1) {
        return false;
      }
    }
    return !(docks[0].dockType === 1 && docks[docks.length - 1].dockType === 1);
  }
  
  //Take the outer ring of hexagons and and add to single dimensional array.
  //the hexes are listed in clockwise order.
  getWaterPieces() {
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

    return docks;
  }

  //Initialization code
  //create an array of types
  setTypes() {
    //for each type, return an array of types eg. 
    //[ [ wheat, wheat, wheat ],
    // [ sheep, sheep, sheep, sheep, ] ... ]
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

  checkSixEight() {
    return super.checkNeighbors((piece, neighbor) => {
      return !((piece.number === 6 || piece.number === 8) &&
        (neighbor.number === 6 || neighbor.number === 8));
    });
  }

  checkTwoTwelve() {
    return super.checkNeighbors((piece, neighbor) => {
      return !((piece.number === 2 || piece.number === 12) &&
        (neighbor.number === 2 || neighbor.number === 12));
    });
  }

  checkTypes() {
    return super.checkNeighbors((piece, neighbor) => {
      return piece['type'] !== neighbor['type'];
    });
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

  terrainDispersion() {
    const cc = val => val * (val - 1) / 2;
    let phi = 0;
    const types = [
      Types.WHEAT,
      Types.SHEEP,
      Types.WOOD,
      Types.BRICK,
      Types.ORE,
    ];
    let outer = this.pieces.reduce((prev, curr) => prev.concat(curr));
    //outer.forEach(item => { console.log(item.geoPoint); })
    types.forEach(type => {
      let hexes = outer.filter(piece => piece.type === type);
      //console.log(hexes);

      let phiTemp = 0;
      for (let i = 0; i < hexes.length - 1; i++) {
        for (let j = i + 1; j < hexes.length; j++) {
          phiTemp += 1 / (Math.pow(hexes[i].geoPoint.x - hexes[j].geoPoint.x, 2) + Math.pow(hexes[i].geoPoint.y - hexes[j].geoPoint.y, 2));
        }
      }

      phi += Math.sqrt(phiTemp / cc(hexes.length)) / types.length;
    });
    //console.log(phi);
    return phi < .5;
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

  checkCustomTypes(arr) {
    if (arr.length === 0) return true;
    return super.checkNeighbors((piece, neighbor) => {
      if (arr.includes(piece.type)) {
        return piece.type !== neighbor.type;
      }
      return true;
    });
  }

  checkAllNumbers() {
    return super.checkNeighbors((piece, neighbor) => {
      return piece.number !== neighbor.number;
    });
  }


  customDistro(arr) {

    //decide how to check water
    const numberCheck = () => {
      if (arr.includes('NUMBERS')) {
        if (!this.checkAllNumbers()) return false;
      }

      if (arr.includes("6 AND 8")) {
        if (!this.checkSixEight()) return false;
      }

      if (arr.includes("2 AND 12")) {
        if (!this.checkTwoTwelve()) return false;
      }

      if (arr.includes('PIP UNIFORMITY')) {
        if (!this.checkPipUniformity()) return false;
      }

      if (arr.includes('DOCK')) {
        if (!this.checkRepeatDocks()) return false;
      }
      return true;
    }

    const typeCheck = () => {

      //strings to ignore
      const filter = [
        'NUMBERS',
        '6 AND 8',
        '2 AND 12',
        'PIP UNIFORMITY',
        'PIP / RESOURCE',
        'DOCK',
      ];

      if (arr.includes('PIP / RESOURCE')) {
        if (!this.checkTypeUniformity()) return false;
      }

      if (arr.includes('DISPERSION')) {
        if (!this.terrainDispersion()) return false;
      }

      return this.checkCustomTypes(arr.filter(item => !filter.includes(item)));
    }
    let count = 0;

    do {
      this.randomizeDocks();
      this.setNumbers();
      this.randomNumbers();
    } while (!numberCheck());
    do {
      this.setTypes();
      this.randomizeTypes();
      count++;
    } while (!typeCheck());
    console.log(count);
  }

  randomDistro() {
    this.setNumbers();
    this.randomNumbers();
    this.setTypes();
    this.randomizeTypes();
    this.randomizeDocks();
  }

  randomFairDistro() {
    if (process.env.NODE_ENV === 'test') this.count = 0;
    do {
      this.setNumbers();
      this.randomNumbers();
    } while (!this.checkSixEight());

    let test = false;
    do {
      this.setTypes();
      this.randomizeTypes();
      if (process.env.NODE_ENV === 'test') this.count++;
    } while (!this.checkTypes());

    do {
      this.randomizeDocks();
    } while(
        false
      );

  }
}

class CatanPiece extends Piece {
  constructor(type = null, number = 0, point) {
    super(point);
    this.type = type;
    this.number = number;
  }

  static copyConstructor(piece) {
    let newPiece = new CatanPiece(piece.type, piece.number, piece.point);
    newPiece.neighbors = piece.neighbors;
    return newPiece;
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
  constructor(dockType, point, geoPoint) {
    super(Types.WATER, 0, point);
    this.dockType = dockType;
    this.dockDir = null;
    this.geoPoint = geoPoint;
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

