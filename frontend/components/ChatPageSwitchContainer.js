import { connect } from 'react-redux';
import withEntityWrapper from './withEntityWrapper';
import { getChannelsMap, getChatPageMessages, getChatViewChannels } from '../reducers/selectors';
import { fetchHistory } from '../actions/messageActions';
import { createChannelSub, switchChannel } from '../actions/channelActions';
import { clearUnreads } from '../actions/readActions';
import { updateDrawer, updateModal } from '../actions/uiActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
  channel: getChannelsMap(state)[chatPath],
  messages: getChatPageMessages(state),
  unreadsMap: state.entities.unreads,
  channels: getChatViewChannels(state),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  fetchHistoryRequest: (chatSlug, startDate) => dispatch(fetchHistory.request(chatSlug, startDate)),
  switchChannel: (channelSlug, scrollLoc) => dispatch(switchChannel(channelSlug, scrollLoc)),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: modalType => dispatch(updateModal(modalType, null)),
});

export default withEntityWrapper('chatPath')(
  connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch)
);
