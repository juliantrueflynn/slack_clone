import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  drawerClose,
  accordionToggle,
  accordionOpen,
} from '../actions/uiActions';
import { fetchSearch, destroySearch } from '../actions/searchActions';
import { selectSearchMessages, selectChannelsWithEntitiesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channels: selectChannelsWithEntitiesMap(state),
  drawerType: state.ui.drawer.drawerType,
  messages: selectSearchMessages(state),
  users: state.entities.members,
  currentUser: state.entities.members[state.session.currentUser.slug],
  accordion: state.ui.accordion.details,
  isSearchLoading: state.isLoading.search,
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  drawerClose: () => dispatch(drawerClose()),
  accordionToggle: () => dispatch(accordionToggle('details', 'members')),
  accordionOpen: () => dispatch(accordionOpen('details', 'members')),
  fetchSearchRequest: query => dispatch(fetchSearch.request(query)),
  destroySearch: () => dispatch(destroySearch()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
