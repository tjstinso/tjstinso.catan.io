export class Map {

  constructor(context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.ratio = width / 2;
    this.pieceHeight = width * Math.sqrt(3);
  }

  calcY(xOffset, yOffset) {
    let y = this.origin.y + yOffset * Math.sqrt(3) * this.width;
    switch (xOffset) {
      case 0:
        return y + this.pieceHeight;
      case 1:
        return y + this.pieceHeight / 2;
      case 2:
        return y;
    }
  }

  calcX(xOffset) {
    return this.origin.x + xOffset * this.width * (3/2);
  }

  drawMap() {

    for (let i = 0; i < 3; i++) {
      //Piece.drawHex(this.context, {x: this.origin.x, y: this.origin.y}, this.width)
      if (i === 0) {
        let x_1 = this.calcX(i);
        let x_2 = this.calcX(4);
        for (let j = 0; j < 3; j++) {
          let y = this.calcY(i, j)
          Piece.drawHex(this.context, {x: x_1, y}, this.width)
          Piece.drawHex(this.context, {x: x_2, y}, this.width)
        }
      } else if (i === 1) {
        let x_1 = this.calcX(i);
        let x_2 = this.calcX(3);
        for (let j = 0; j < 4; j++) {
          let y = this.calcY(i, j);
          Piece.drawHex(this.context, {x: x_1, y}, this.width)
          Piece.drawHex(this.context, {x: x_2, y}, this.width)
        }
      } else {
        let x = this.calcX(i);
        for (let j = 0; j < 5; j++) {
          let y = this.calcY(i, j)
          Piece.drawHex(this.context, {x, y}, this.width)
        }
      }
    }

  }

}

export class Piece {

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
