import { connect } from 'react-redux';
import { getChatroomsMap, getMessagesMap, getUnsubbedChannels } from '../reducers/selectors';
import { updateModal, fetchSearch, updateSearchQuery } from '../actions/uiActions';
import { fetchChatrooms, createChatroom, updateChatroom } from '../actions/chatroomActions';
import { updateUser, updatePassword } from '../actions/userActions';
import { createWorkspace } from '../actions/workspaceActions';
import ModalController from '../components/ModalController';

const mapStateToProps = (state) => {
  const msgsMap = getMessagesMap(state);
  const searchSlugs = state.search.messagesBySearch;
  const messages = searchSlugs.map(msgSlug => msgsMap[msgSlug]).sort((a, b) => b.id - a.id);

  const usersMap = state.entities.members;
  const currUser = state.session.currentUser;
  const user = currUser && usersMap[currUser.slug];

  return {
    currModalOpen: state.ui.displayModal.modalType,
    modalProps: state.ui.displayModal.modalProps,
    chatroomsMap: getChatroomsMap(state),
    chatrooms: getUnsubbedChannels(state),
    chatroomSlug: state.ui.displayChatPath,
    messages,
    usersMap,
    user,
    searchQuery: state.search.searchQuery,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(updateModal(null)),
  fetchChatroomsRequest: workspaceSlug => dispatch(fetchChatrooms.request(workspaceSlug)),
  channelFormRequest: (chatroom) => {
    const actionCall = chatroom.slug ? updateChatroom : createChatroom;

    return dispatch(actionCall.request(chatroom));
  },
  updateUserRequest: user => dispatch(updateUser.request(user)),
  updatePasswordRequest: password => dispatch(updatePassword.request(password)),
  createWorkspaceRequest: workspace => dispatch(createWorkspace.request(workspace)),
  fetchSearchRequest: searchQuery => dispatch(fetchSearch.request(searchQuery)),
  updateSearchQuery: (searchQuery = '') => dispatch(updateSearchQuery(searchQuery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalController);
