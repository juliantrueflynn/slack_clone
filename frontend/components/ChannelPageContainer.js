import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { fetchChannel } from '../actions/channelActions';
import { selectParentMessages, selectHashDmUsersBySlug, selectDmUsernamesBySlug } from '../reducers/selectors';
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
  dmUsernames: selectDmUsernamesBySlug(state, params.channelSlug, false),
});

const mapDispatchToProps = dispatch => ({
  fetchChannelRequest: channelSlug => dispatch(fetchChannel.request(channelSlug)),
  readUpdateRequest: readableId => dispatch(readUpdate.request(readableId, 'Channel')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
