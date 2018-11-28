import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withEntityWrapper from './withEntityWrapper';
import { selectChatPageMessagesBySlug, selectChatPageChannelsBySlug } from '../reducers/selectors';
import { fetchHistory } from '../actions/messageActions';
import { createChannelSub, switchChannel } from '../actions/channelActions';
import { clearUnreads } from '../actions/unreadActions';
import { drawerClose, modalClose, modalOpen } from '../actions/uiActions';
import { createReaction } from '../actions/reactionActions';
import ChatPageSwitch from './ChatPageSwitch';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  drawerType: state.ui.drawer.drawerType,
  drawerSlug: state.ui.drawer.drawerSlug,
  modal: state.ui.displayModal,
  isLoading: state.isLoading,
  channels: selectChatPageChannelsBySlug(state, chatPath),
  messages: selectChatPageMessagesBySlug(state, chatPath),
});

const mapDispatchToProps = dispatch => ({
  createChannelSubRequest: channelSub => dispatch(createChannelSub.request(channelSub)),
  createReactionRequest: reaction => dispatch(createReaction.request(reaction)),
  fetchHistoryRequest: (chatSlug, startDate) => dispatch(fetchHistory.request(chatSlug, startDate)),
  switchChannel: (channelSlug, scrollLoc) => dispatch(switchChannel(channelSlug, scrollLoc)),
  clearUnreads: (channelSlug, lastRead) => dispatch(clearUnreads(channelSlug, lastRead)),
  drawerClose: () => dispatch(drawerClose()),
  modalClose: () => dispatch(modalClose()),
  modalOpen: modalType => dispatch(modalOpen(modalType, null)),
});

const entityProps = { entityName: 'channels', pathName: 'chatPath' };

export default withRouter(
  withEntityWrapper(entityProps)(connect(mapStateToProps, mapDispatchToProps)(ChatPageSwitch))
);
