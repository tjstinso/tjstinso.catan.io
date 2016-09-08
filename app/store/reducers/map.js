import { CatanMap as Map } from '../../model/Map/CatanMap';

const DEFAULT_SIZE = 7;

const initialState = {
  map:(() => {
    let map = new Map(7);
    map.randomFairDistro();
    return map;
  })(),
  options: [
    'WHEAT',
    'BRICK', 
    'ORE', 
    'SHEEP', 
    'WOOD',
    'DOCK',
    'NUMBERS',
    '6 AND 8',
    '2 AND 12',
    'PIP UNIFORMITY',
    'PIP / RESOURCE',
    'DISPERSION',
  ],
  presetOptions: [
    'FAIR RANDOM',
    'RANDOM',
    'CUSTOM',
  ],
  mode: "FAIR RANDOM",
  selectedOptions: [
  ],
  rules: {
    'FAIR RANDOM': (map) => {
      map.randomFairDistro();
    },
    'RANDOM': (map) => {
      map.randomDistro();
    },
    'CUSTOM': (map, arr) => {
      map.customDistro(arr);
    },
    'UNIFORM': (map) => {
      map.uniformDistro();
    }
  },
}

const SET_OPTIONS = 'SET_OPTIONS';
const SET_UNIQUE = 'SET_UNIQUE';
const SET_MAP = 'SET_MAP';
const REROLL = 'REROLL';
const REMOVE_OPTION = 'REMOVE_OPTION';
const SET_MODE = 'SET_MODE;'

export function setMap(options) { 
  return { type: SET_MAP, options };
}

export function setOption(options) {
  return { type: SET_OPTIONS, options };
}

export function setUnique(option) {
  return { type: SET_UNIQUE, option };
}

export function removeOption(option) {
  return { type: REMOVE_OPTION, option };
}

export function reroll() {
  return { type: REROLL };
}

export function setMode(mode) {
  return { type: SET_MODE, mode };
}

export default function(state=initialState, action) {
  let map, options, option;

  switch(action.type) {
    case SET_MAP:
      options = state.selectedOptions.concat(action.options);
      return Object.assign({}, { ...state },  { selectedOptions: options });

    case SET_MODE:
      let newOption
      if (action.mode !== 'CUSTOM') {
        newOption = [];
      } else newOption = [ ...state.selectedOptions ];
      return Object.assign({}, { ...state }, { mode: action.mode }, { selectedOptions: newOption });

    case SET_OPTIONS:
      return Object.assign({}, { ...state });

    case SET_UNIQUE: 
      map = new Map(7);
      option = action.option;
      state.rules[option](map);
      return Object.assign({}, { ...state }, { map }, { mode: option }, { selectedOptions: [] });

    case REROLL:
      map = new Map(7);
      state.rules[state.mode](map, state.selectedOptions);
      return Object.assign({}, { ...state }, { map });

    case REMOVE_OPTION:
      return Object.assign({}, { ...state }, { selectedOptions: state.selectedOptions.filter(option => option !== action.option)})

    default:
      return state;
  }
}
