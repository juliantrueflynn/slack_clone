import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  modalOpen,
  drawerClose,
  accordionToggle,
  accordionOpen,
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
});

const mapDispatchToProps = dispatch => ({
  modalOpen: modalType => dispatch(modalOpen(modalType)),
  drawerClose: () => dispatch(drawerClose()),
  accordionToggle: () => dispatch(accordionToggle('details', 'members')),
  accordionOpen: () => dispatch(accordionOpen('details', 'members')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
