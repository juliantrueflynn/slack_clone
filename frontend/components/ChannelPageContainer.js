import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { fetchChannel, createChannelSub } from '../actions/channelActions';
import {
  selectParentMessages,
  selectHashDmUsersBySlug,
  selectDmUsernamesBySlug,
  isUserChatSub,
  selectCurrentUserId,
} from '../reducers/selectors';
import { readUpdate } from '../actions/readActions';

const mapStateToProps = (state, { match: { params } }) => ({
  messages: selectParentMessages(state),
  channels: Object.values(state.entities.channels),
  channelSlug: params.channelSlug,
  messageSlug: state.ui.displayMessageSlug,
  rightSidebar: state.ui.rightSidebar,
  userSlug: state.ui.displayUserSlug,
  isWorkspaceLoaded: !!state.entities.workspaces[params.workspaceSlug],
  channel: state.entities.channels[params.channelSlug],
  authors: selectHashDmUsersBySlug(state, params.channelSlug),
  currentUser: state.session.currentUser,
  dmUsernames: selectDmUsernamesBySlug(state, params.channelSlug, false),
  isChatSub: isUserChatSub(state),
  currentUserId: selectCurrentUserId(state),
});

const mapDispatchToProps = dispatch => ({
  fetchChannelRequest: channelSlug => dispatch(fetchChannel.request(channelSlug)),
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  readUpdateRequest: readableId => dispatch(readUpdate.request(readableId, 'Channel')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
