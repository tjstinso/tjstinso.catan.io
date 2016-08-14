const initialState = {
  selectedOptions: [],
  options: [
    'fair random',
    'random'
  ],
}

const SET_OPTIONS = 'SET_OPTIONS';
const SET_UNIQUE = 'SET_UNIQUE';

export function setOption(options) {
  return { type: SET_OPTIONS, options };
}

export function setUnique(option) {
  return { type: SET_UNIQUE, option };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_OPTIONS:
      return Object.assign({}, { ...state });
    case SET_UNIQUE: 
      return Object.assign({}, { ...state }, { selectedOptions: [].concat(action.option) });
    default:
      return state;
  }
}
