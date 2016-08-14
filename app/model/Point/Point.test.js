let Point = require('./point').ThreeDHexPoint;

function setup() {
  let a = new Point(1,1);
  let b = new Point(1,1);
  let c = new Point(1,0);
  return {
    a,
    b,
    c,
  }
}

describe('', () => {
  it('should return the distance between two points', () => {
    const { a, b, c } = setup();
    expect(a.distanceFrom(b)).toBe(0);
    expect(a.distanceFrom(c)).toBe(1);
  })
})
