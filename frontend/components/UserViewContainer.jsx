import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMember } from '../actions/memberActions';
import UserView from './UserView';

const mapStateToProps = (state, { match }) => ({
  user: state.entities.members[match.params.userSlug],
});

const mapDispatchToProps = dispatch => ({
  fetchMemberRequest: userSlug => dispatch(fetchMember.request(userSlug)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserView));
