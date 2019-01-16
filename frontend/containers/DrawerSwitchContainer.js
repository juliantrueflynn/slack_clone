import { connect } from 'react-redux';
import { updateDrawer, updateModal } from '../actions/uiActions';
import { createChatroom } from '../actions/chatroomActions';
import { destroyPin } from '../actions/pinActions';
import {
  getChatPage,
  getConvoDrawer,
  getChatroomDetailsDrawer,
  getFavoritesDrawer,
} from '../reducers/selectors';
import withWindowResize from '../hoc/withWindowResize';
import DrawerSwitch from '../components/DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => {
  const { drawerType, drawerSlug } = params;
  const chatroom = getChatPage(state);

  let messages = [];
  let drawerTitle = '';

  if (drawerType === 'convo') {
    messages = getConvoDrawer(state, drawerSlug);
    drawerTitle = 'Thread';
  }

  if (drawerType === 'favorites') {
    messages = getFavoritesDrawer(state);
    drawerTitle = 'Starred items';
  }

  if (drawerType === 'details') {
    messages = getChatroomDetailsDrawer(state);

    if (chatroom && !chatroom.hasDm) {
      drawerTitle = `About #${chatroom.title}`;
    }

    drawerTitle = 'About this conversation';
  }

  if (drawerType === 'team') {
    drawerTitle = 'Workspace directory';
  }

  return {
    accordion: state.ui.accordion.details,
    currentUser: state.session.currentUser,
    drawerSlug,
    drawerType,
    drawerTitle,
    chatroom,
    chatroomSlug: state.ui.displayChatPath,
    isLoading: state.isLoading.drawer,
    messages,
    usersMap: state.entities.members,
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
  };
};

export default withWindowResize(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch));
