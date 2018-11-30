import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  drawerClose,
  accordionOpen,
  destroySearch,
  fetchSearch,
  modalClose,
} from '../actions/uiActions';
import { destroyChannelSub } from '../actions/channelActions';
import { selectMessages, selectChannelsMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channelsMap: selectChannelsMap(state),
  messages: selectMessages(state),
  users: state.entities.members,
  currentUser: state.session.currentUser,
  modalType: state.ui.displayModal.modalType,
  drawerType: state.ui.drawer.drawerType,
  searchQuery: state.ui.searchQuery,
  isLoading: state.isLoading.search,
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  drawerClose: () => dispatch(drawerClose()),
  accordionOpen: accordionType => dispatch(accordionOpen('details', accordionType)),
  fetchSearchRequest: (query, shouldNotSearch = false) => (
    dispatch(fetchSearch.request(query, shouldNotSearch))
  ),
  destroySearch: () => dispatch(destroySearch()),
  destroyChannelSubRequest: channelSlug => dispatch(destroyChannelSub.request(channelSlug)),
  modalClose: () => dispatch(modalClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
