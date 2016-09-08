import _enum from '../../utilities/enum';
import { Point } from '../Point/Point';
import { HashPoints } from '../Point/HashPoints';

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
  { name: 'TOP_RIGHT', x: -1, y: 1 },
  { name: 'RIGHT', x: 0, y: 1 },
  { name: 'BOTTOM_RIGHT', x: 1, y: 0 },
  { name: 'BOTTOM_LEFT', x: 1, y: -1 },
  { name: 'LEFT', x: 0, y: -1 },
  { name: 'TOP_LEFT', x: -1, y: 0 },
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



//Build a list of Points based a diameter.

export class GameMap {

  constructor(diameter) {
    this.Neighbors = Neighbors;
    this.Dir = Dir;
    this.pieces = this.buildNodes(diameter)
    this.hashmap = {};
  }

  //creates the layout that correctly matches a cartesian plane
  geoLayout() {
    this.pieces.forEach((row, i) => row.forEach((piece, j) => {
      let x, y;
      if (i <= Math.floor(this.pieces.length / 2)) {
        x = i * -1 / 2 + j * 1;

      } else {
        x = -Math.floor(this.pieces.length / 2) / 2 + (i - Math.floor(this.pieces.length / 2)) / 2 + j * 1;

      }
      y = i * Math.sqrt(3) / 2;

      piece.geoPoint = new Point(x, y);
    }));
  }

  //each hex has 6 vertexes, in this there will be unique vertexes, as such
  //we can just create a list of unique vertexes
  //does not get the outer most layer of vertexes
  getVertexes(cb) {

    //returns 3 hexes associated to one vertex
    const calcVert = (i,j, dirOne, dirTwo) => {
      return cb([
        this.pieces[i][j], //first item in array is always real
        this.hashmap.getPointFromMap(new Point(this.pieces[i][j].point.x + Neighbors[dirOne].x, this.pieces[i][j].point.y + Neighbors[dirOne].y), this.pieces),
        this.hashmap.getPointFromMap(new Point(this.pieces[i][j].point.x + Neighbors[dirTwo].x, this.pieces[i][j].point.y + Neighbors[dirTwo].y), this.pieces),
      ])
    }

    //helper methods to find all 6 vertexes surrounding hex
    const calcTopLeft = (i, j) => calcVert(i, j, Dir.LEFT, Dir.TOP_LEFT);
    const calcTop = (i, j) => calcVert(i, j, Dir.TOP_LEFT, Dir.TOP_RIGHT);
    const calcTopRight = (i, j) => calcVert(i, j, Dir.TOP_RIGHT, Dir.RIGHT);
    const calcBottomLeft = (i, j) => calcVert(i, j, Dir.LEFT, Dir.BOTTOM_LEFT);
    const calcBottom = (i, j) => calcVert(i, j, Dir.BOTTOM_LEFT, Dir.BOTTOM_RIGHT);
    const calcBottomRight = (i, j) => calcVert(i, j, Dir.RIGHT, Dir.BOTTOM_RIGHT);

    let vertexes = [];
    for (let i = 1; i < this.pieces.length - 1; i++) {
      let one = [], two = [], three = [], four = []; // array to hold each row of vertexes

      //build two rows at a time
      //for first half of map, grab top and top left vertexes and push to array,
      //mirror that for second half of hex map
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        if (i < Math.floor(this.pieces.length / 2)) {
          one.push( calcTop(i, j) );
          two.push( calcTopLeft(i, j));
          if (j === this.pieces[i].length - 2) {
            two.push(calcTopRight(i, j)); //at last index, get the odd corner indexes
          }

        } else if (i === Math.floor(this.pieces.length / 2)) {
          one.push( calcTop(i, j) );
          two.push( calcTopLeft(i, j));
          three.push(calcBottomLeft(i, j));
          four.push(calcBottom(i, j));
          if (j === this.pieces[i].length - 2) {
            two.push(calcTopRight(i, j));
            three.push(calcBottomRight(i, j));
          }
        } else {
          one.push(calcBottomLeft(i, j));
          two.push(calcBottom(i, j));
          if (j === this.pieces[i].length - 2) {
            one.push(calcBottomRight(i, j));
          }
        }
      }
        vertexes.push(one, two);
      if (i === Math.floor(this.pieces.length / 2)) {
        vertexes.push(three, four);
      }
    }
    return vertexes; //this is an array of arrays of arrays
  }

  // calculate the coordinate system for hex board;
	// http://www.redblobgames.com/grids/hexagons/ using the skewed system
  buildNodes(diameter) {
    let nodes = [];
    for (let i = -Math.floor(diameter / 2); i <= Math.floor(diameter / 2); i++) { //outer handles x value
      let minY;
      let width = diameter - Math.abs(i);

      if (i < 0) {
        minY = -Math.floor(diameter / 2) - i; //0, -1, -2, etc...
      } else {
        minY = -Math.floor(diameter / 2);
      }

      for (let j = minY; j < width - Math.abs(minY); j++) {
        if (i + Math.floor(diameter / 2) >= nodes.length) nodes.push([]);
        nodes[i + Math.floor(diameter / 2)][j - minY] = new Point(i, j);
      }
    }
    return nodes;
  }

  //Iterates through each piece, and each pieces neighbors
  initNeighbors() {
    this.hashmap = new HashPoints(this.pieces);
    this.pieces.forEach((row, i) => {
      row.forEach((piece, j) => {
        //if (piece instanceof Dock) piece.calcDir(j, i, this);
        this.findNeighbors(i, j);
      })
    });
  }


  //find all neighbors of piece at location[i][j]
  findNeighbors(i, j) {
    this.Neighbors.enumerate().forEach(neighbor => {
      let yOffset;
      let xOffset;
      let piece = this.pieces[i][j];
      let point = new Point(piece.point.x + this.Neighbors[neighbor].x, piece.point.y + this.Neighbors[neighbor].y);
      let check = this.hashmap.getPointFromMap(point, this.pieces);
      if (check !== null) {
        this.pieces[i][j].neighbors.push(
          () => this.hashmap.getPointFromMap(point, this.pieces)
            //check
        );
      }
    });
  }

  /**
   * Iterate through the inner pieces and call some function on both the current piece
   * and the neighbor your are viewing
   * @returns True if test passes, false otherwise
   */
  checkNeighbors(cb) {
    for (let i = 1; i < this.pieces.length - 1; i++) {
      for (let j = 1; j < this.pieces[i].length - 1; j++) {
        //iterate over neighbor nodes
        for (let k = 0; k < this.pieces[i][j].neighbors.length; k++) {
          if (!cb(this.pieces[i][j], this.pieces[i][j].neighbors[k]())) {
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

  constructor(point) {
    this.neighbors = [];
    this.point = point;
  }

  //check if piece is neighbor in direction
  checkNeighbor(dir, piece) {
    return piece.point.isEqual(new Point(this.point.x + Neighbors[dir].x, this.point.y + Neighbors[dir].y));
  }

}

//export const Neighbors = _enum([
//  { name: 'TOP_RIGHT', x: -1, y: 1 },
//  { name: 'RIGHT', x: 0, y: 1 },
//  { name: 'BOTTOM_RIGHT', x: 1, y: 0 },
//  { name: 'BOTTOM_LEFT', x: 1, y: -1 },
//  { name: 'LEFT', x: 0, y: -1 },
//  { name: 'TOP_LEFT', x: -1, y: 0 },
//]);
