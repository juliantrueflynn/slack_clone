import { connect } from 'react-redux';
import { updateModal, fetchSearch, destroySearch } from '../actions/uiActions';
import { fetchChannels } from '../actions/channelActions';
import { getChannelsMap, getMessagesMap } from '../reducers/selectors';
import ModalController from './ModalController';

const mapStateToProps = (state) => {
  const channelsMap = getChannelsMap(state);
  const msgsMap = getMessagesMap(state);
  const searchSlugs = state.search.messagesBySearch;
  const messages = searchSlugs.map(msgSlug => msgsMap[msgSlug]).sort((a, b) => b.id - a.id);

  return {
    currModalOpen: state.ui.displayModal.modalType,
    modalProps: state.ui.displayModal.modalProps,
    channelsMap,
    channels: Object.values(channelsMap).filter(ch => !ch.isSub && !ch.hasDm),
    messages,
    users: state.entities.members,
    searchQuery: state.search.searchQuery,
    isLoading: state.isLoading.search,
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
  closeModal: () => dispatch(updateModal(null)),
  fetchChannelsRequest: workspaceSlug => dispatch(fetchChannels.request(workspaceSlug)),
  fetchSearchRequest: (query, shouldNotSearch = false) => (
    dispatch(fetchSearch.request(query, shouldNotSearch))
  ),
  destroySearch: () => dispatch(destroySearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalController);
