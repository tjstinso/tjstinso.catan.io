import { Map, Piece } from './model/map';
<<<<<<< HEAD

import { MapView } from './view/MapView';
=======
>>>>>>> 20aa2940d911c886c733119dca60788119191abf

import { MapView } from './view/MapView';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
<<<<<<< HEAD
  ele.width = `${750}`;
  ele.height = `${750}`;

  let mView = new MapView(map, ctx, {x: 50, y: 50}, 50);
=======
  map.randomDistro();
  console.log(map);
  ele.width = `${750}`;
  ele.height = `${750}`;

  let mView = new MapView(map, ctx, {x: 250, y: -150}, 50);
>>>>>>> 20aa2940d911c886c733119dca60788119191abf
  mView.draw();


})()
