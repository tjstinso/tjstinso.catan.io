import { Types } from '../model/map';


export class MapView {
  constructor(origin, width, map) {
    this.map = map;
    this.width = width;
    this.origin = origin;
    this.pieceHeight = width //* Math.sqrt(3);
  }

  calcX(xOffset) {
    return this.origin.x + xOffset * this.width * 3 / 2
  }

  invX(xOffset) {
    return this.origin.x + xOffset * this.width * (3/2) - this.width;
  }

  invY(xOffset, yOffset) {
    this.origin + xOffset * this.width
  }

  invX(xOffset, yOffset) {
    this.origin.x + xOffset * this.width * (3/2) - this.width;
  }

  calcY(xOffset, yOffset) {
    //return this.origin.y + yOffset * this.width * 2
    let y = this.origin.y + yOffset * this.width * Math.sqrt(3);
    //let y = this.origin.y //+ yOffset * Math.sqrt(3) * this.width;
    switch (xOffset) {
      case 0:
        return y
      case 1:
        return y - this.pieceHeight * Math.sqrt(3) / 2
      case 2:
        return y - this.pieceHeight * Math.sqrt(3)
      case 3:
        return y - this.pieceHeight * Math.sqrt(3) * 3 / 2;
      case 4:
        return y - this.pieceHeight * Math.sqrt(3)
      case 5:
        return y - this.pieceHeight *  Math.sqrt(3) / 2;
      case 6:
        return y

    }
  }

  draw(map) {
    let context = document.getElementById('map').getContext('2d');
    context.save();
    context.font = `${this.width / 3}px Verdana`;
    let pieces = map.pieces;
    for (let i = 0; i < pieces.length; i++) {

      let y = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {

        let x = this.calcY(i, j);
        context.fillStyle = this.setColor(column[j].type);
        PieceView.drawHex(context, {x, y}, this.width)

        if (column[j].number > 0) {
          context.fillStyle = 'white';
          context.beginPath();
          context.arc(x, y, this.width / 3, 0, 2 * Math.PI);
          context.stroke();
          context.fill();

          let num = column[j].number;
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillStyle = num === 6 || num === 8 ? 'red' : 'black';
          context.fillText(column[j].number, x, y);
        }

      }
    }
    context.restore();
  }

  getDistance(x, y) {
    return Math.sqrt(x*x + y+y);
  }

  setColor(type) {
    switch(type) {
      case Types.WHEAT:
        return "lightgreen";
      case Types.SHEEP:
        return "green";
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

export class PieceView {

  static drawHex(context, origin, width) {
    context.save();
    let ratio = width * Math.sqrt(3) / 2
    let xOff = 3 / 2 * width / 2;
    let offset = ratio * Math.sqrt(3);
    context.beginPath();

    context.moveTo(origin.x, origin.y)
    context.lineTo(origin.x, origin.y - width);

    context.lineTo(origin.x + ratio , origin.y - width / 2);
    context.lineTo(origin.x + ratio, origin.y + width / 2)
    context.lineTo(origin.x, origin.y + width);

    context.lineTo(origin.x - ratio , origin.y + width / 2);
    context.lineTo(origin.x - ratio, origin.y - width / 2)
    context.lineTo(origin.x, origin.y - width);

    context.fill();
    context.restore();
  }

}
