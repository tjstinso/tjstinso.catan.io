import { Map, Piece } from './model/map';

import { MapView, PieceView } from './view/MapView';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
  map.randomDistro();
  ele.width = `${750}`;
  ele.height = `${750}`;
  let mView = new MapView(map, ctx, {x: 100, y: 175}, 50);
  //setInterval(() => {
    mView.draw()
  //}, 500)
  //mView.draw();

  //PieceView.drawHex(ctx, {x: 50, y: 50}, 50);


})()
