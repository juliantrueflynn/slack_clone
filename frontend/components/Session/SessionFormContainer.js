import { connect } from 'react-redux';
import SessionForm from './SessionForm';
import { signIn, signUp } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  isSignInPage: location.pathname === '/signin',
});

const mapDispatchToProps = (dispatch, { location }) => ({
  sessionRequest: (user) => {
    if (location.pathname === '/signin') {
      return dispatch(signIn.request(user));
    }

    return dispatch(signUp.request(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
