import { connect } from 'react-redux';
import Options from './Option';
import { removeOption, setMap, reroll, setUnique } from '../../store/reducers/map';

function mapStateToProps(state) {
  const { map } = state;
  return {
    map
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectUniqueOption: (option) => {
      dispatch(setUnique(option));
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
