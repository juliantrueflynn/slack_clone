import { connect } from 'react-redux';
import { updateDrawer, updateModal } from '../actions/uiActions';
import { createChannel } from '../actions/channelActions';
import { destroyPin } from '../actions/messageActions';
import { getDrawerMessages } from '../reducers/selectors';
import withEntityWrapper from './withEntityWrapper';
import withWindowResize from './withWindowResize';
import DrawerSwitch from './DrawerSwitch';

const mapStateToProps = (state, { match: { params } }) => ({
  messagesMap: getDrawerMessages(state),
  favorites: Object.values(state.entities.favorites),
  chatPath: state.ui.displayChannelSlug,
  drawerType: params.drawerType,
  accordion: state.ui.accordion.details,
});

const mapDispatchToProps = dispatch => ({
  openDrawer: drawer => dispatch(updateDrawer(drawer)),
  closeDrawer: () => dispatch(updateDrawer(null)),
  openModal: (modalType, modalProps = {}) => dispatch(updateModal(modalType, modalProps)),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
  destroyPinRequest: id => dispatch(destroyPin.request(id)),
});

export default withEntityWrapper('drawerSlug')(
  withWindowResize(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch))
);
