import chits from './valid_chits_red_check.js'
import { Map } from '../model/map';

let arr = [];
let answerArr = [];
let map = new Map();

for (let i = 0; i < chits.length; i++) {
  arr.push(chits[i]);
  if (i > 0 && i % 18 === 0) {
    map.numbers = arr;
    map.randomNumbers();
    let test = map.checkNumbers();
    answerArr.push(test);
    console.log(test)
    map = new Map();
    arr = [];
  }
}

console.log(answerArr.filter(check => check == false).length === 0);
//console.log(chits[0])
//chits.forEach(console.log)
