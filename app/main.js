import { Map, Piece } from './model/map';

import { MapView, PieceView } from './view/MapView';

//(() => {
  let ele = document.getElementById('map');
  ele.width = `${750}`;
  ele.height = `${750}`;
  let ctx = document.getElementById('map').getContext('2d');
  let map = new Map();
  let mView = new MapView({x: 100, y: 175}, 50);

  //window.requestAnimationFrame(mView.draw);
  map.randomDistro();

  setInterval(() => {
    ctx.clearRect(0,0,ele.width,ele.height);
    mView.draw(map)
  }, 50)
  //mView.draw();

  //PieceView.drawHex(ctx, {x: 50, y: 50}, 50);

  let button = document.getElementById('test-button');
  button.addEventListener('click', () => {
    map = new Map();
    map.randomDistro();
  });
