import { Types } from '../model/map';

<<<<<<< HEAD
=======

>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
export class MapView {
  constructor(map, context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.map = map;
    this.ratio = width / 2;
    this.pieceHeight = width * Math.sqrt(3);
    //context.rotate(60 * Math.PI / 180); //need to translate to to some degree to put board on stage
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
    this.context.rotate(30 * Math.PI / 180);
    let pieces = this.map.getPieces();
    for (let i = 0; i < pieces.length; i++) {
      let x = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {
<<<<<<< HEAD
        let y = this.calcY(i, j);
        this.context.fillStyle = this.setColor(column[j].type);
        PieceView.drawHex(this.context, {x, y}, this.width)
      }

=======

        let y = this.calcY(i, j);
        this.context.fillStyle = this.setColor(column[j].type);
        PieceView.drawHex(this.context, {x, y}, this.width)

        if (column[j].number > 0) {
          this.context.fillStyle = 'white';
          this.context.beginPath();
          this.context.arc(x, y, this.width / 3, 0, 2 * Math.PI);
          this.context.stroke();
          this.context.fill();

          //this.context.rotate(-30 * Math.PI / 180);
          //let angleX = x * this.width / 2 * Math.sqrt(3) / 2;
          //let angleY = x * this.width / 2;
          this.context.fillStyle = 'black';
          this.context.fillText(column[j].number, x, y);
          //this.context.rotate(30 * Math.PI / 180);
        }

      }
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
    }
  }

  setColor(type) {
    switch(type) {
      case Types.WHEAT:
<<<<<<< HEAD
        return "yellow";
      case Types.SHEEP:
        return "white";
=======
        return "lightgreen";
      case Types.SHEEP:
        return "green";
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
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
