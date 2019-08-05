import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlaylistPreview from '../components/PlaylistPreview';
import * as playlistPreviewActions from '../actions/playlistPreviewActions';

const mapStateToProps = state => ({
  added: state.tracks.added,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(playlistPreviewActions, dispatch),
});

const _PlaylistPreview = connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview);

export default _PlaylistPreview;
