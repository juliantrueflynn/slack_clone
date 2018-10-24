import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withEntityWrapper from './withEntityWrapper';
import { selectChatPageMessagesBySlug, selectChatPageChannelsBySlug } from '../reducers/selectors';
import { fetchHistory } from '../actions/messageActions';
import { createChannelSub, switchChannel } from '../actions/channelActions';
import { clearUnreads } from '../actions/unreadActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
  modal: state.ui.displayModal,
  isLoading: state.isLoading.channel,
  channels: selectChatPageChannelsBySlug(state, chatPath),
  messages: selectChatPageMessagesBySlug(state, chatPath),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  fetchHistoryRequest: (chatSlug, startDate) => dispatch(fetchHistory.request(chatSlug, startDate)),
  switchChannel: (channelSlug, scrollLoc) => dispatch(switchChannel(channelSlug, scrollLoc)),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
});

const entityProps = { entityName: 'channels', pathName: 'chatPath' };

export default withRouter(
  withEntityWrapper(entityProps)(connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch))
);
