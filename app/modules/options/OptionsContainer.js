import { connect } from 'react-redux';
import Options from './Option';
import { setOptions, setUnique } from '../../store/reducers/map';

function mapStateToProps(state) {
  const { gameOptions } = state;
  return {
    gameOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectUniqueOption: (option) => {
      dispatch(setUnique(option));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
