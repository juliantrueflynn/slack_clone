import { connect } from 'react-redux';
import { updateDrawer, updateModal } from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { destroyPin, createMessage } from '../actions/messageActions';
import { getDrawerMessages, getChannelsMap } from '../reducers/selectors';
import withEntityWrapper from './withEntityWrapper';
import withWindowResize from './withWindowResize';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => {
  const chatPath = state.ui.displayChatPath;
  const channelsMap = getChannelsMap(state);

  return {
    messages: getDrawerMessages(state),
    channelsMap,
    channel: channelsMap[chatPath],
    chatPath,
    drawerType: params.drawerType,
    accordion: state.ui.accordion.details,
  };
};

const mapDispatchToProps = dispatch => ({
  openDrawer: (drawerType, drawerSlug) => dispatch(updateDrawer(drawerType, drawerSlug)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default withEntityWrapper('drawerSlug')(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch))
);
