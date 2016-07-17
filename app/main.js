import { Map, Piece } from './map';

(() => {

  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map(ctx, {x: 50, y: 50}, 50);
  ele.width = `${500}`
  ele.height = `${500}`;

  map.drawMap();

  //Piece.drawHex(ctx, {x: 50, y: 50}, 50);
  //Piece.drawHex(ctx, {x: 50, y: 50 + Math.sqrt(3) * 50}, 50);
  //Piece.drawHex(ctx, {x: 50, y: 50 + 2 * Math.sqrt(3) * 50}, 50);

})()
