import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as homeActions from '../actions/homeActions';
import * as profileActions from '../actions/profileActions';

const mapStateToProps = state => ({
  playlists: state.user.playlists,
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(homeActions, dispatch),
  ...bindActionCreators(profileActions, dispatch)
});

const _Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default _Home;