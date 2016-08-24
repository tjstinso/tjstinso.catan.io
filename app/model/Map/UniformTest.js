function cc(n) {
  return n * (n - 1) / 2;
}

const chitToPipMap = () => {
  let map = new Map();
  let valueList = [0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1,];
  let uniqueList = [0, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12,]; 
  uniqueList.forEach((item, i) => map.set(item, valueList[i]));
  return map;
}

export function checkUniformity(pieces) {
  let map = chitToPipMap();
  let chits = pieces.map(item => map.get(item.number));
  return chits.reduce((prev, curr) => prev + cc(curr.number), 0) < 1100;
}
