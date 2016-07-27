import { Map } from '../model/map';

  let map = new Map()
  let total = 0;
  let i;
  let std = [];
  for (i = 0; i < 1000; i++) {
    map.randomDistro()
    std.push(map.count)
    total += map.count;
    map = new Map();
  }
  let avg = total / i
  console.log(
    Math.sqrt(
        ( std.map(num => (num - avg) * (num - avg))
          .reduce((prev, next) => prev + next) / std.length)
        )
      )
  console.log(total / i);
