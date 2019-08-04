import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenreSelect from '../components/GenreSelect';
import * as genreSelectActions from '../actions/genreSelectActions';
import * as trackPreviewActions from '../actions/trackPreviewActions';

const mapStateToProps = state => {
  let genres = { ...state.genres };
  delete genres.genresSelected;
  return {
    auth: state.auth,
    genres,
    genresSelected: state.genres.genresSelected
  }
};



const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(genreSelectActions, dispatch),
  ...bindActionCreators(trackPreviewActions, dispatch)
});

const _GenreSelect = connect(mapStateToProps, mapDispatchToProps)(GenreSelect);

export default _GenreSelect;