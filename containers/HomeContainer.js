import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as homeActions from '../actions/homeActions';
import * as profileActions from '../actions/profileActions';
import * as playlistTracksActions from '../actions/playlistTracksActions';
import * as trackPreviewActions from '../actions/trackPreviewActions';

const mapStateToProps = state => ({
  playlists: state.user.playlists,
  auth: state.auth,
  user: state.user,
  genres: Object.entries(state.genres).filter(genre => genre[1]).map(genre => genre[0]),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(homeActions, dispatch),
  ...bindActionCreators(profileActions, dispatch),
  ...bindActionCreators(playlistTracksActions, dispatch),
  ...bindActionCreators(trackPreviewActions, dispatch)
});

const _Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default _Home;