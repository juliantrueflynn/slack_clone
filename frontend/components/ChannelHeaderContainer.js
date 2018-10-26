import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { modalOpen, drawerClose, accordionOpen } from '../actions/uiActions';
import { fetchSearch, destroySearch } from '../actions/searchActions';
import { selectSearchMessages, selectChannelWithEntitiesBySlug } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channel: selectChannelWithEntitiesBySlug(state, chatPath),
  drawerType: state.ui.drawer.drawerType,
  messages: selectSearchMessages(state),
  users: state.entities.members,
  currentUser: state.entities.members[state.session.currentUser.slug],
  isSearchLoading: state.isLoading.search,
  searchQuery: state.ui.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  drawerClose: () => dispatch(drawerClose()),
  accordionOpen: () => dispatch(accordionOpen('details', 'members')),
  fetchSearchRequest: query => dispatch(fetchSearch.request(query)),
  destroySearch: () => dispatch(destroySearch()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
