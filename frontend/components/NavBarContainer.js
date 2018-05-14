import { connect } from 'react-redux';
import NavBar from './NavBar';
import { requestSignOut } from '../actions/sessionActions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  requestSignOut: () => dispatch(requestSignOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);