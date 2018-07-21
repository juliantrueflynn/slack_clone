import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMember } from '../actions/memberActions';
import { createDmChat } from '../actions/channelActions';
import { selectWorkspaceIdBySlug, selectDmWithUser } from '../reducers/selectors';
import UserView from './UserView';

const mapStateToProps = (state, { match: { params } }) => ({
  user: state.entities.members[params.userSlug],
  workspaceSlug: params.workspaceSlug,
  userSlug: params.userSlug,
  hasDmWith: selectDmWithUser(state, params.userSlug),
  isChannelsLoaded: !!Object.values(state.entities.channels).length,
  workspaceId: selectWorkspaceIdBySlug(state, params.workspaceSlug),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberRequest: userSlug => dispatch(fetchMember.request(userSlug)),
  createDmChatRequest: (dmChat, memberIds) => dispatch(createDmChat.request(dmChat, memberIds)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserView));
