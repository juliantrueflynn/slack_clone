import { connect } from 'react-redux';
import NavBar from './navbar';
import { requestSignOut } from '../../actions/session_actions';

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