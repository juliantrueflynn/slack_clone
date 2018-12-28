import { connect } from 'react-redux';
import { getChannelsMap, getMessagesMap, getUnsubbedChannels } from '../reducers/selectors';
import { updateModal, fetchSearch, destroySearch } from '../actions/uiActions';
import { fetchChannels, createChannel, updateChannel } from '../actions/channelActions';
import { updateUser, updatePassword } from '../actions/userActions';
import { createWorkspace } from '../actions/workspaceActions';
import ModalController from './ModalController';

const mapStateToProps = (state) => {
  const msgsMap = getMessagesMap(state);
  const searchSlugs = state.search.messagesBySearch;
  const messages = searchSlugs.map(msgSlug => msgsMap[msgSlug]).sort((a, b) => b.id - a.id);

  const users = state.entities.members;
  const currUser = state.session.currentUser;
  const user = currUser && users[currUser.slug];

  return {
    currModalOpen: state.ui.displayModal.modalType,
    modalProps: state.ui.displayModal.modalProps,
    channelsMap: getChannelsMap(state),
    channels: getUnsubbedChannels(state),
    messages,
    users,
    user,
    searchQuery: state.search.searchQuery,
    isLoading: state.isLoading.search,
  };
};

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(updateModal(null)),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  channelFormRequest: (channel) => {
    const actionCall = channel.slug ? updateChannel : createChannel;

    return dispatch(actionCall.request(channel));
  },
  updateUserRequest: user => dispatch(updateUser.request(user)),
  updatePasswordRequest: password => dispatch(updatePassword.request(password)),
  createWorkspaceRequest: workspace => dispatch(createWorkspace.request(workspace)),
  fetchSearchRequest: (query, shouldNotSearch = false) => (
    dispatch(fetchSearch.request(query, shouldNotSearch))
  ),
  destroySearch: () => dispatch(destroySearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalController);
