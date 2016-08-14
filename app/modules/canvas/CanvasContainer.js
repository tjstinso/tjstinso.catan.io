import React from 'react';
import { connect } from 'react-redux';
import Canvas from './Canvas';
import { setMap } from '../../store/reducers/map';
import { setMapView, setSize } from '../../store/reducers/view';

function mapStateToProps(state) { 
  const { map, view } = state;
  return { map, view };
}

function mapDispatchToState(dispatch) { 
  return {
    updateMap: () => {
      dispatch(setMap());
    },
    updateSize: (size) => {
      let hexSize = size / 7 / Math.sqrt(3);
        dispatch(setSize(size));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToState,
)(Canvas)
