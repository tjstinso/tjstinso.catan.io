import { Map, Piece, Enum } from './model/map';

import { MapView } from './view/MapView';

(() => {
  console.log(enums);
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
  ele.width = `${750}`;
  ele.height = `${750}`;

  let mView = new MapView(map, ctx, {x: 50, y: 50}, 50);
  mView.draw();


})()
