import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { sessionSignIn, sessionSignUp } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  isSignInPage: location.pathname === '/signin'
});

const mapDispatchToProps = (dispatch, { location }) => ({
  sessionRequest: user => {
    if (location.pathname === '/signin') {
      return dispatch(sessionSignIn(user));
    }
    
    return dispatch(sessionSignUp(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);