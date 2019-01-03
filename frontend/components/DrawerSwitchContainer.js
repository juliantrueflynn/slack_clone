import { connect } from 'react-redux';
import { updateDrawer, updateModal } from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { destroyPin, createMessage } from '../actions/messageActions';
import {
  getChatPage,
  getConvoDrawer,
  getChannelDetailsDrawer,
  getFavoritesDrawer,
} from '../reducers/selectors';
import withWindowResize from './withWindowResize';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => {
  const { drawerType, drawerSlug } = params;
  let messages = [];

  if (drawerType === 'convo') {
    messages = getConvoDrawer(state, drawerSlug);
  }

  if (drawerType === 'favorites') {
    messages = getFavoritesDrawer(state);
  }

  if (drawerType === 'details') {
    messages = getChannelDetailsDrawer(state);
  }

  return {
    currentUser: state.session.currentUser,
    users: state.entities.members,
    isLoading: state.isLoading.drawer,
    messages,
    channel: getChatPage(state),
    chatPath: state.ui.displayChatPath,
    drawerType,
    drawerSlug,
    accordion: state.ui.accordion.details,
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { drawerType, drawerSlug } } }) => ({
  openDrawer: () => dispatch(updateDrawer(drawerType, drawerSlug)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
  createMessageRequest: message => dispatch(createMessage.request(message)),
});

export default withWindowResize(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch));
