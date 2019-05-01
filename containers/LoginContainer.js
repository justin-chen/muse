import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import * as loginActions from '../actions/loginActions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(loginActions, dispatch),
});

const _Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default _Login;