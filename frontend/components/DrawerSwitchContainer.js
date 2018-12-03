import { connect } from 'react-redux';
import {
  drawerOpen,
  drawerClose,
  modalOpen,
  modalClose,
} from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { destroyPin } from '../actions/messageActions';
import { selectDrawerMessages } from '../reducers/selectors';
import withEntityWrapper from './withEntityWrapper';
import withDetectMobileView from './withDetectMobileView';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => ({
  messagesMap: selectDrawerMessages(state),
  favorites: Object.values(state.entities.favorites),
  chatPath: state.ui.displayChannelSlug,
  drawerType: params.drawerType,
  modalType: state.ui.displayModal.modalType,
  accordion: state.ui.accordion.details,
});

const mapDispatchToProps = dispatch => ({
  openDrawer: drawer => dispatch(drawerOpen(drawer)),
  closeDrawer: () => dispatch(drawerClose()),
  modalOpen: (modalType, modalProps = {}) => dispatch(modalOpen(modalType, modalProps)),
  modalClose: () => dispatch(modalClose()),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
});

export default withEntityWrapper('drawerSlug')(
  withDetectMobileView(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch))
);
