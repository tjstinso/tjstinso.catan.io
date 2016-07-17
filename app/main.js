import { Map, Piece } from './map';

(() => {

  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map(ctx, {x: 50, y: 50}, 500);
  ele.width = `${map.width}`
  ele.height = `${map.width}`;

  //map.drawMap();

  Piece.drawHex(ctx, {x: 50, y: 50}, 50);

})()
