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
  ],
  presetOptions: [
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
    },
    'custom': (map, arr) => {
      map.customDistro(arr);
    },
  },
}

const SET_OPTIONS = 'SET_OPTIONS';
const SET_UNIQUE = 'SET_UNIQUE';
const SET_MAP = 'SET_MAP';
const REROLL = 'REROLL';
const REMOVE_OPTION = 'REMOVE_OPTION';

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

export default function(state=initialState, action) {
  let map, options, option;

  switch(action.type) {
    case SET_MAP:
      options = state.selectedOptions.filter(option => {
        return !state.presetOptions.includes(option)
      }).concat(action.options);
      return Object.assign({}, { ...state }, { selectedOptions: options });

    case SET_OPTIONS:
      return Object.assign({}, { ...state });

    case SET_UNIQUE: 
      map = new Map(7);
      option = action.option;
      state.rules[option](map);
      return Object.assign({}, { ...state }, { map }, { selectedOptions: [option] });

    case REROLL:
      map = new Map(7);
      if (state.selectedOptions.filter(option => state.presetOptions.includes(option)).length > 0) {
        state.rules[state.selectedOptions[0]](map);
      } else {
        state.rules.custom(map, state.selectedOptions);
      }
      return Object.assign({}, { ...state }, { map });

    case REMOVE_OPTION:
      return Object.assign({}, { ...state }, { selectedOptions: state.selectedOptions.filter(option => option !== action.option)})

    default:
      return state;
  }
}
