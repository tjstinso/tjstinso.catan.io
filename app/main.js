import { Map } from './map';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map(800, 800);
  ele.width = `${map.width}`
  ele.height = `${map.height}`;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, ele.width, ele.height);
})()
