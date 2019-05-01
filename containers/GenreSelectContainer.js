import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenreSelect from '../components/GenreSelect';
import * as genreSelectActions from '../actions/genreSelectActions';

const mapStateToProps = state => ({
  genres: state.genres
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(genreSelectActions, dispatch),
});

const _GenreSelect = connect(mapStateToProps, mapDispatchToProps)(GenreSelect);

export default _GenreSelect;