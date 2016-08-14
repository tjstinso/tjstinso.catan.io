import { MapView } from '../../view/MapView'


const initialState = {
  map: {},
  height: "",
  width: "",
  hexSize: "",
}

const SET_MAP_VIEW = 'SET_MAP_VIEW';
const SET_SIZE = 'SET_SIZE';

export function setMapView() {
  return { type: SET_MAP_VIEW };
}

export function setSize(size, map) {
  return { type: SET_SIZE, size, map };
}

export default function view(state = initialState, action) {
  switch(action.type) {
    case SET_SIZE:
      let { size, map } = action;
      let hexSize = size / 7 / Math.sqrt(3);
      let height = 10 * size;
      let width = 7 * Math.sqrt(3) * size;
      let newView = new MapView({x:  3 / 2 * hexSize, y:  7 / 2 * hexSize}, hexSize, map);
      return Object.assign({}, ...state, { map: newView }, { hexSize }, { height }, { width });
    default:
      return state;
  }
}
