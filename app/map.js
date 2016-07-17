export class Map {

  constructor(context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.ratio = width / 2;
    this.pieceHeight = width * 2 * Math.cos(Math.PI / 180 * 30);
  }

  drawMap() {

    for (let i = 0; i < 5; i++) {
      if (i === 0) {
        for (let j = 0; j < 3; j++) {
          let x = i * this.width;
          let y = (1 + j) * this.pieceHieght;
          console.log(x);
          console.log(y);
          Piece.drawHex(this.context, {x, y}, this.width)
        }
      } else if (i === 1) {
        if (i != 5) {

        }
      } else if (i === 2) {

      } else if (i === 3) {
        if (i != 5) {

        }
      } else {
        if (i != 0 && i != 4) {

        }
      }
    }

  }

}

export class Piece {
  constructor(context, origin, width) {
    this.context = context;
    this.origin = origin;
    this.width = width;
  }

  static drawHex(context, origin, width) {
    let ratio = width / 2;
    context.beginPath();
    context.moveTo(origin.x + ratio, origin.y + width * Math.sqrt(3) / 2);
    context.lineTo(origin.x + width, origin.y);
    context.lineTo(origin.x + ratio, origin.y - width * Math.sqrt(3) / 2);
    context.lineTo(origin.x - ratio, origin.y - width * Math.sqrt(3) / 2);
    context.lineTo(origin.x - width, origin.y);
    context.lineTo(origin.x - ratio, origin.y + width * Math.sqrt(3) / 2);
    context.lineTo(origin.x + ratio, origin.y + width * Math.sqrt(3) / 2);
    context.fill()
  }
}
