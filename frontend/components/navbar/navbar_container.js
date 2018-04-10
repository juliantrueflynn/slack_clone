import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from './actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);