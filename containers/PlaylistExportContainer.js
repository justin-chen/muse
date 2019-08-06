import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlaylistExport from '../components/PlaylistExport';
import * as trackPreviewActions from '../actions/trackPreviewActions';
import * as playlistExportActions from '../actions/playlistExportActions';
import * as profileActions from '../actions/profileActions';

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  added: state.tracks.added,
  playlists: state.user.playlists,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(playlistExportActions, dispatch),
  ...bindActionCreators(profileActions, dispatch),
  ...bindActionCreators(trackPreviewActions, dispatch),
});

const _PlaylistExport = connect(mapStateToProps, mapDispatchToProps)(PlaylistExport);

export default _PlaylistExport;
