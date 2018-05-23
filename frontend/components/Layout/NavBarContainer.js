import { connect } from 'react-redux';
import NavBar from './NavBar';
import { signOutRequest } from '../../actions/sessionActions';

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  signOutRequest: () => dispatch(signOutRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);