import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { signInRequest, signUpRequest } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  isSignInPage: location.pathname === '/signin'
});

const mapDispatchToProps = (dispatch, { location }) => ({
  sessionRequest: user => {
    if (location.pathname === '/signin') {
      return dispatch(signInRequest(user));
    }
    
    return dispatch(signUpRequest(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);