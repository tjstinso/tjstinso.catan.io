class Enum {
  constructor(arr) {
    arr.forEach(arg => {
      this[arg] = arg;
    });
  }
  enumerate() {
    let arr = [];
    for (let v in this) {
      arr = arr.concat(v);
    }
    return arr;
  }
}

export default function _enum(arr) {
  return new Enum(arr);
}
