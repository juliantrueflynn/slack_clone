import { connect } from 'react-redux';
import withEntityWrapper from './withEntityWrapper';
import {
  drawerOpen,
  drawerClose,
  modalOpen,
  modalClose,
} from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { destroyPin } from '../actions/messageActions';
import { selectDrawerMessages } from '../reducers/selectors';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => ({
  messagesMap: selectDrawerMessages(state),
  favorites: Object.values(state.entities.favorites),
  chatPath: state.ui.displayChannelSlug,
  drawerType: params.drawerType,
  isModalOpen: state.ui.displayModal.modalType === 'MODAL_DRAWER_MOBILE',
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
  connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch)
);
