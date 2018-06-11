import { connect } from 'react-redux';
import NavBar from './NavBar';
import { signOut } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser),
});

const mapDispatchToProps = dispatch => ({
  signOutRequest: () => dispatch(signOut.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
