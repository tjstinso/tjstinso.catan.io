<<<<<<< HEAD
=======
import { Types } from '../model/map';

>>>>>>> 20aa2940d911c886c733119dca60788119191abf
export class MapView {
  constructor(map, context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.map = map;
    this.ratio = width / 2;
    this.pieceHeight = width * Math.sqrt(3);
<<<<<<< HEAD
=======
    //context.rotate(60 * Math.PI / 180); //need to translate to to some degree to put board on stage
>>>>>>> 20aa2940d911c886c733119dca60788119191abf
  }

  calcX(xOffset) {
    return this.origin.x + xOffset * this.width * (3/2);
  }

  calcY(xOffset, yOffset) {
    let y = this.origin.y + yOffset * Math.sqrt(3) * this.width;
    switch (xOffset) {
      case 0:
        return y + this.pieceHeight * 3 / 2;
      case 1:
        return y + this.pieceHeight;
      case 2:
        return y + this.pieceHeight * 1 / 2;
      case 3:
        return y;
      case 4:
        return y + this.pieceHeight * 1 / 2;
      case 5:
        return y + this.pieceHeight;
      case 6:
        return y + this.pieceHeight * 3 / 2;

    }
  }

  draw() {
<<<<<<< HEAD
=======
    this.context.rotate(30 * Math.PI / 180);
>>>>>>> 20aa2940d911c886c733119dca60788119191abf
    let pieces = this.map.getPieces();
    for (let i = 0; i < pieces.length; i++) {
      let x = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {
        let y = this.calcY(i, j);
<<<<<<< HEAD
=======
        this.context.fillStyle = this.setColor(column[j].type);
>>>>>>> 20aa2940d911c886c733119dca60788119191abf
        PieceView.drawHex(this.context, {x, y}, this.width)
      }

    }
  }

<<<<<<< HEAD
=======
  setColor(type) {
    switch(type) {
      case Types.WHEAT:
        return "yellow";
      case Types.SHEEP:
        return "white";
      case Types.WOOD:
        return "brown";
      case Types.BRICK:
        return "red";
      case Types.ORE:
        return "black";
      case Types.DESERT:
        return "gray";
      case Types.WATER:
        return "blue";
    }
  }

>>>>>>> 20aa2940d911c886c733119dca60788119191abf
}

class PieceView {

  static drawHex(context, origin, width) {
    let ratio = width / 2;
    let offset = ratio * Math.sqrt(3);
    context.beginPath();
    context.moveTo(origin.x + ratio, origin.y + offset);
    context.lineTo(origin.x + width, origin.y);
    context.lineTo(origin.x + ratio, origin.y - offset);
    context.lineTo(origin.x - ratio, origin.y - offset);
    context.lineTo(origin.x - width, origin.y);
    context.lineTo(origin.x - ratio, origin.y + offset);
    context.lineTo(origin.x + ratio, origin.y + offset);
    context.fill()
  }

}
