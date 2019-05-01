import { connect } from 'react-redux';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const mapStateToProps = state => ({
  access_token: state.auth.access_token
});

const _AuthLoadingScreen = connect(mapStateToProps)(AuthLoadingScreen);

export default _AuthLoadingScreen;