import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  modalClose,
  drawerClose,
  accordionOpen,
} from '../actions/uiActions';
import { fetchSearch, destroySearch } from '../actions/searchActions';
import { destroyChannelSub } from '../actions/channelActions';
import { selectMessagesWithEntities, selectChannelsWithEntitiesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channels: selectChannelsWithEntitiesMap(state),
  drawerType: state.ui.drawer.drawerType,
  messages: selectMessagesWithEntities(state),
  users: state.entities.members,
  isSearchLoading: state.isLoading.search,
  searchQuery: state.ui.searchQuery,
  isSearchModalOpen: state.ui.displayModal.modalType === 'MODAL_SEARCH',
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  modalClose: () => dispatch(modalClose()),
  drawerClose: () => dispatch(drawerClose()),
  accordionOpen: () => dispatch(accordionOpen('details', 'members')),
  fetchSearchRequest: query => dispatch(fetchSearch.request(query)),
  destroySearch: () => dispatch(destroySearch()),
  destroyChannelSubRequest: id => dispatch(destroyChannelSub.request(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
