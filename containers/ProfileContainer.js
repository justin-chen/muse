import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../components/Profile';
import * as loginActions from '../actions/loginActions';

const mapStateToProps = state => ({
  profile: state.user.profile,
  genres: Object.entries(state.genres).filter(genre => genre[1]).map(genre => genre[0])
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(loginActions, dispatch),
});

const _Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default _Profile;