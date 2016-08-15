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
  rules: {
    'fair random': (map) => {
      map.randomFairDistro();
    },
    'random': (map) => {
      map.randomDistro();
    }
  },
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
      let options = action.options;
      options.forEach(option => {
        state.rules[option](map);
      });
      return Object.assign({}, { ...state }, { map }, { selectedOptions: options });
    case SET_OPTIONS:
      return Object.assign({}, { ...state });
    case SET_UNIQUE: 
      return Object.assign({}, { ...state }, { selectedOptions: [].concat(action.option) });
    default:
      return state;
  }
}
