import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { sessionSignIn, sessionSignUp } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  isSignInPage: location.pathname === '/signin',
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => {
    if (ownProps.location.pathname === '/signin') {
      return dispatch(sessionSignIn(user));
    } else {
      return dispatch(sessionSignUp(user));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);