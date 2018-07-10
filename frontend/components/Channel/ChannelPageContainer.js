import { connect } from 'react-redux';
import ChannelPage from './ChannelPage';
import { fetchChannel, leaveChannel } from '../../actions/channelActions';
import { selectParentMessages, selectChannelIdBySlug } from '../../reducers/selectors';
import readUpdate from '../../actions/readActions';

const mapStateToProps = (state, { match: { params } }) => ({
  messages: selectParentMessages(state),
  channelSlug: params.channelSlug,
  rightSidebar: state.ui.rightSidebar,
  messageSlug: state.ui.displayMessageSlug,
  userSlug: state.ui.displayUserSlug,
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  channelId: selectChannelIdBySlug(state, params.channelSlug),
});

const mapDispatchToProps = dispatch => ({
  fetchChannelRequest: channelSlug => dispatch(fetchChannel.request(channelSlug)),
  readUpdateRequest: readableId => dispatch(readUpdate.request(readableId, 'Channel')),
  leaveChannel: channelSlug => dispatch(leaveChannel(channelSlug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
