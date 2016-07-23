import { Map, Piece } from './model/map';

import { MapView } from './view/MapView';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
  map.randomDistro();
  console.log(map);
  ele.width = `${750}`;
  ele.height = `${750}`;

  let mView = new MapView(map, ctx, {x: 250, y: -150}, 50);
  mView.draw();


})()
