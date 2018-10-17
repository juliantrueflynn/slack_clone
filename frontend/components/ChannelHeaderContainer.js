import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { modalOpen, drawerClose } from '../actions/uiActions';
import { selectChannelsWithEntitiesMap } from '../reducers/selectors';
import ChannelHeader from './ChannelHeader';

const mapStateToProps = (state, { match: { params: { chatPath } } }) => ({
  chatPath,
  drawerType: state.ui.drawer.drawerType,
  channels: selectChannelsWithEntitiesMap(state),
  currentUser: state.entities.members[state.session.currentUser.slug],
});

const mapDispatchToProps = dispatch => ({
  modalOpen: modalType => dispatch(modalOpen(modalType)),
  drawerClose: () => dispatch(drawerClose()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeader));
