import { connect } from 'react-redux';
import ChannelSessionForm from './SessionForm';
import { signUp, signIn } from '../../actions/sessionActions';

const mapStateToProps = (state, { location }) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.errors.session,
  formType: location.pathname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => {
    if (ownProps.location.pathname === '/signin') {
      return dispatch(signIn(user));
    } else {
      return dispatch(signUp(user));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSessionForm);