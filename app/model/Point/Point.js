export class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  isEqual(point) {
    return point instanceof Point && this.x === point.x && this.y === point.y;
  }
}

/**
 *  Represent a 3d point on a hex board
 *  Z point is implicit, do not need to check for equality anywhere on the board.
 */
export class ThreeDHexPoint extends Point {
  constructor(x, y) {
    super(x, y);
    this.z = -this.x - this.y;
  }

  distanceFrom(point) {
    if (point instanceof ThreeDHexPoint) {
      const calc = (field) => Math.abs(this[field] - point[field]);
      return (calc('x') + calc('y') + calc('z')) / 2;
    }
  }
}

