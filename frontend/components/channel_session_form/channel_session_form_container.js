import { connect } from 'react-redux';
import ChannelSessionForm from './channel_session_form';
import { signup, signin } from '../../actions/session_actions';

const mapStateToProps = (state, { location }) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.errors.session,
  formType: location.pathname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => {
    if (ownProps.location.pathname === '/signin') {
      return dispatch(signin(user));
    } else {
      return dispatch(signup(user));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSessionForm);