export class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

export class Piece {
  constructor(context, origin, width) {
    this.context = context;
    this.origin = origin;
    this.width = width;
  }

  static drawHex(context, origin, width) {
    console.log('hello world');
    context.beginPath();
    context.moveTo(origin.x + width / 2, origin.y + width * Math.cos(60));
    context.lineTo(origin.x + width, origin.y);
    context.lineTo(origin.x + width / 2, origin.y - width * Math.cos(60));
    context.lineTo(origin.x - width / 2, origin.y - width * Math.cos(60));
    context.lineTo(origin.x - width, origin.y);
    context.lineTo(origin.x - width / 2, origin.y + width * Math.cos(60));
    context.lineTo(origin.x + width / 2, origin.y + width * Math.cos(60));
    context.fill()
  }
}

function drawHex(context, origin, width) {
}
