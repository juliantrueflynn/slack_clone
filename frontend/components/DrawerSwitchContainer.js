import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withEntityWrapper from './withEntityWrapper';
import { drawerClose, drawerOpen, modalOpen } from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { selectDrawerMessagesByType, selectChannelWithEntitiesBySlug } from '../reducers/selectors';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => ({
  messages: selectDrawerMessagesByType(state),
  channel: selectChannelWithEntitiesBySlug(state, params.chatPath),
  drawerType: params.drawerType,
  accordion: state.ui.accordion.details,
  isLoading: state.ui.isDrawerLoading,
});

const mapDispatchToProps = dispatch => ({
  openDrawer: drawer => dispatch(drawerOpen(drawer)),
  closeDrawer: () => dispatch(drawerClose()),
  openProfileModal: () => dispatch(modalOpen('MODAL_PROFILE', null)),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
});

const entityProps = { entityName: 'drawer', pathName: 'drawerSlug' };

export default withRouter(
  withEntityWrapper(entityProps)(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch))
);
