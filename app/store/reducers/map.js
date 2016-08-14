import { CatanMap as Map } from '../../model/Map/CatanMap';

const DEFAULT_SIZE = 7;

const initialState = {
  map:(() => {
    let map = new Map(7);
    map.randomFairDistro();
    return map;
  })(),
  option: [
    'fair random',
    'random'
  ],
  selectedOptions: [
    'fair random',
  ],
}

const SET_OPTIONS = 'SET_OPTIONS';
const SET_UNIQUE = 'SET_UNIQUE';
const SET_MAP = 'SET_MAP';

export function setMap(options) { 
  return { type: SET_MAP, options };
}

export function setOption(options) {
  return { type: SET_OPTIONS, options };
}

export function setUnique(option) {
  return { type: SET_UNIQUE, option };
}

export default function(state=initialState, action) {
  switch(action.type) {
    case SET_MAP:
      let map = new Map(7);
      map.randomDistro();
      return Object.assign({}, ...state, map );
    case SET_OPTIONS:
      return Object.assign({}, { ...state });
    case SET_UNIQUE: 
      return Object.assign({}, { ...state }, { selectedOptions: [].concat(action.option) });
    default:
      return state;
  }
}
