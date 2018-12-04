import { connect } from 'react-redux';
import withEntityWrapper from './withEntityWrapper';
import { selectChatPageMessagesBySlug, selectChannelsMap } from '../reducers/selectors';
import { fetchHistory } from '../actions/messageActions';
import { createChannelSub, switchChannel } from '../actions/channelActions';
import { clearUnreads } from '../actions/readActions';
import { updateDrawer, modalOpen } from '../actions/uiActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
  channel: selectChannelsMap(state)[chatPath],
  messages: selectChatPageMessagesBySlug(state, chatPath),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  fetchHistoryRequest: (chatSlug, startDate) => dispatch(fetchHistory.request(chatSlug, startDate)),
  switchChannel: (channelSlug, scrollLoc) => dispatch(switchChannel(channelSlug, scrollLoc)),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  modalOpen: modalType => dispatch(modalOpen(modalType, null)),
});

export default withEntityWrapper('chatPath')(
  connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch)
);
