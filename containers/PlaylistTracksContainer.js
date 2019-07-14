import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlaylistTracks from '../components/PlaylistTracks';
import * as playlistTracksActions from '../actions/playlistTracksActions';

const mapStateToProps = (state, ownProps) => ({
  tracks: state.user.playlists[ownProps.navigation.getParam('index')].tracks,
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(playlistTracksActions, dispatch),
});

const _PlaylistTracks = connect(mapStateToProps, mapDispatchToProps)(PlaylistTracks);

export default _PlaylistTracks;