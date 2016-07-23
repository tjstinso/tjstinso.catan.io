import { Map, Piece } from './model/map';
<<<<<<< HEAD
=======

>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
import { MapView } from './view/MapView';

(() => {
  let ele = document.getElementById('map');
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
<<<<<<< HEAD

=======
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
  map.randomDistro();
  console.log(map);
  ele.width = `${750}`;
  ele.height = `${750}`;
<<<<<<< HEAD

=======
>>>>>>> e4cebf6e7c4d8560a9f9bdf434f633ad90003f04
  let mView = new MapView(map, ctx, {x: 250, y: -150}, 50);
  mView.draw();


})()
