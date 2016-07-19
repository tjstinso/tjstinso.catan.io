export class MapView {
  constructor(map, context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.map = map;
    this.ratio = width / 2;
    this.pieceHeight = width * Math.sqrt(3);
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
    let pieces = this.map.getPieces();
    for (let i = 0; i < pieces.length; i++) {
      let x = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {
        let y = this.calcY(i, j);
        PieceView.drawHex(this.context, {x, y}, this.width)
      }

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
