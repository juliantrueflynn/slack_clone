import { connect } from 'react-redux';
import NavBar from './NavBar';
import { sessionSignOut } from '../actions/sessionActions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  sessionSignOut: () => dispatch(sessionSignOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);