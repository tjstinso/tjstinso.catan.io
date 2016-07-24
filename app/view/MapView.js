import { Types } from '../model/map';


export class MapView {
  constructor(map, context, origin, width) {
    this.width = width;
    this.context = context;
    this.origin = origin;
    this.map = map;
    this.pieceHeight = width //* Math.sqrt(3);
    //this.context.font = "20px Verdana"
    this.context.font = `${this.width / 3}px Verdana`;
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

  draw() {
    let pieces = this.map.getPieces();
    for (let i = 0; i < pieces.length; i++) {
      //let x = this.origin.x + i * this.width * Math.sqrt(3)
      let y = this.calcX(i);
      let column = pieces[i];
      for (let j = 0; j < column.length; j++) {

        let x = this.calcY(i, j);
        this.context.fillStyle = this.setColor(column[j].type);
        PieceView.drawHex(this.context, {x, y}, this.width)

        if (column[j].number > 0) {
          this.context.fillStyle = 'white';
          this.context.beginPath();
          this.context.arc(x, y, this.width / 3, 0, 2 * Math.PI);
          this.context.stroke();
          this.context.fill();

          let str = `${column[j].number}`;
          this.context.textAlign = 'center'
          this.context.textBaseline = 'middle'
          this.context.fillStyle = 'black';
          this.context.fillText(column[j].number, x, y);
        }

      }
    }
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
    let ratio = width * Math.sqrt(3) / 2
    let xOff = 3 / 2 * width / 2;
    let offset = ratio * Math.sqrt(3);
    context.beginPath();
    //context.moveTo(origin.x + ratio, origin.y + offset);
  //  context.lineTo(origin.x + width, origin.y);
  //  context.lineTo(origin.x + ratio, origin.y - offset);
  //  context.lineTo(origin.x - ratio, origin.y - offset);
  //  context.lineTo(origin.x - width, origin.y);
  //  context.lineTo(origin.x - ratio, origin.y + offset);
  //  context.lineTo(origin.x + ratio, origin.y + offset);
  //  context.fill()


    context.moveTo(origin.x, origin.y)
    context.lineTo(origin.x, origin.y - width);

    context.lineTo(origin.x + ratio , origin.y - width / 2);
    context.lineTo(origin.x + ratio, origin.y + width / 2)
    context.lineTo(origin.x, origin.y + width);

    context.lineTo(origin.x - ratio , origin.y + width / 2);
    context.lineTo(origin.x - ratio, origin.y - width / 2)
    context.lineTo(origin.x, origin.y - width);

    //context.lineTo(origin.x, origin.y - ratio;)

    //context.lineTo(origin.x - (origin.x + ratio * Math.sqrt(3) / 2), origin.y - ratio / 2);

    //context.lineTo(origin.x, origin.y + ratio)
    //context.lineTo(origin.x - width * Math.cos(30), origin.y + width * Math.sin(30));
  //  context.lineTo(origin.x - width * Math.cos(30), origin.y - width * Math.sin(30));
  //  context.lineTo(origin.x, origin.y - width * Math.sin(30));
  //  context.lineTo(origin.x + width * Math.cos(30), origin.y - width * Math.sin(30));
    context.fill();
  }

}
