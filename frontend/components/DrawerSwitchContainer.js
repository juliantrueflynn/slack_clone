import { connect } from 'react-redux';
import { updateDrawer, updateModal } from '../actions/uiActions';
import { createChatroom } from '../actions/chatroomActions';
import { createMessage } from '../actions/messageActions';
import { destroyPin } from '../actions/pinActions';
import {
  getChatPage,
  getConvoDrawer,
  getChatroomDetailsDrawer,
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
    messages = getChatroomDetailsDrawer(state);
  }

  return {
    accordion: state.ui.accordion.details,
    currentUser: state.session.currentUser,
    drawerSlug,
    drawerType,
    chatroom: getChatPage(state),
    chatPath: state.ui.displayChatPath,
    isLoading: state.isLoading.drawer,
    messages,
    users: state.entities.members,
  };
};

const mapDispatchToProps = (dispatch, { match: { params } }) => {
  const { drawerType, drawerSlug } = params;

  return {
    openDrawer: () => dispatch(updateDrawer(drawerType, drawerSlug)),
    closeDrawer: () => dispatch(updateDrawer(null)),
    openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
    createChatroomRequest: dmChat => dispatch(createChatroom.request(dmChat)),
    destroyPinRequest: id => dispatch(destroyPin.request(id)),
    createMessageRequest: message => dispatch(createMessage.request(message)),
  };
};

export default withWindowResize(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch));
