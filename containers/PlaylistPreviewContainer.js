import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlaylistPreview from '../components/PlaylistPreview';

const mapStateToProps = state => ({
  added: state.tracks.added,
});

const mapDispatchToProps = dispatch => ({
});

const _PlaylistPreview = connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview);

export default _PlaylistPreview;
