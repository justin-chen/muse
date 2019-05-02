import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as homeActions from '../actions/homeActions';

const mapStateToProps = state => ({
  playlists: state.user.playlists
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(homeActions, dispatch),
});

const _Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default _Home;