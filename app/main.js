import { CatanMap } from './model/Map/CatanMap';
import { MapView, PieceView } from './view/MapView';
import 'materialize-loader';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/index';
import App from './modules/App';

const store = createStore(reducers);
render( 
  <Provider store={store}> 
    <App /> 
  </Provider>,
  document.getElementById('root')
)

/*
(() => {
  let ele = document.getElementById('map');
  ele.width = `${750}`;
  ele.height = `${750}`;
  let ctx = document.getElementById('map').getContext('2d');
  let map = new CatanMap(7);
  let mView = new MapView({x: 100, y: 175}, 50);

  //window.requestAnimationFrame(mView.draw);
  map.randomDistro();

  setInterval(() => {
    ctx.clearRect(0,0,ele.width,ele.height);
    mView.draw(map, ctx)
  }, 50)

  let button = document.getElementById('test-button');
  button.addEventListener('click', () => {
    mapFunc();
    map = new CatanMap(7);
    map.randomDistro();
  });
})()
*/
