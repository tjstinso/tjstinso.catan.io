import { connect } from 'react-redux';
import Options from './Option';
import { setMode, removeOption, setMap, reroll, setUnique } from '../../store/reducers/map';

function mapStateToProps(state) {
  const { map } = state;
  return {
    map
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMode: (mode) => {
      dispatch(setMode(mode));
    },
    selectMap: (options) => {
      dispatch(setMap(options));
    },
    removeOption: (option) => {
      dispatch(removeOption(option));
    },
    reroll: () => {
      dispatch(reroll());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
