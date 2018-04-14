import { connect } from 'react-redux';
import ChannelSessionForm from './channel_session_form';
import { signUp, signIn } from '../../actions/session_actions';

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