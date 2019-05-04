import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPreview from '../components/TrackPreview';
// import * as trackPreviewActions from '../actions/trackPreviewActions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  // ...bindActionCreators(trackPreviewActions, dispatch),
});

const _TrackPreview = connect(mapStateToProps, mapDispatchToProps)(TrackPreview);

export default _TrackPreview;