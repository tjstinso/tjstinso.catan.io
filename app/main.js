import { Map, Piece } from './map';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map(800, 800);
  ele.width = `${map.width}`
  ele.height = `${map.height}`;

  Piece.drawHex(ctx, {x: 50, y: 50}, 50);
})()
