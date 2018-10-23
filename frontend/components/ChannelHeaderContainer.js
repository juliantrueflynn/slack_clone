import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  drawerClose,
  accordionToggle,
  accordionOpen,
  fetchSearch,
} from '../actions/uiActions';
import { selectChannelsWithEntitiesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  channel: state.entities.channels[chatPath],
  drawerType: state.ui.drawer.drawerType,
  channels: selectChannelsWithEntitiesMap(state),
  currentUser: state.entities.members[state.session.currentUser.slug],
  accordion: state.ui.accordion.details,
  messages: Object.values(state.entities.messages),
  users: state.entities.members,
});

const mapDispatchToProps = dispatch => ({
  modalOpen: (modalType, modalProps = null) => dispatch(modalOpen(modalType, modalProps)),
  drawerClose: () => dispatch(drawerClose()),
  accordionToggle: () => dispatch(accordionToggle('details', 'members')),
  accordionOpen: () => dispatch(accordionOpen('details', 'members')),
  fetchSearchRequest: query => dispatch(fetchSearch.request(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
