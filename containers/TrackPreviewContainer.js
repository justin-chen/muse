import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPreview from '../components/TrackPreview';
import * as trackPreviewActions from '../actions/trackPreviewActions';

const mapStateToProps = state => ({
  tracks: state.tracks.session,
  added: state.tracks.added,
  auth: state.auth,
  genres: Object.entries(state.genres).filter(genre => genre[0] != 'genresSelected' && genre[1]).map(genre => genre[0]),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(trackPreviewActions, dispatch),
});

const _TrackPreview = connect(mapStateToProps, mapDispatchToProps)(TrackPreview);

export default _TrackPreview;