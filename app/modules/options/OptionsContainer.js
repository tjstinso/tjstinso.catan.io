import { connect } from 'react-redux';
import Options from './Option';
import { setMap } from '../../store/reducers/map';

function mapStateToProps(state) {
  const { gameOptions } = state;
  return {
    gameOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectUniqueOption: (option) => {
      console.log(option)
      dispatch(setMap([option]));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
