import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { drawerClose, drawerOpen, modalOpen } from '../actions/uiActions';
import { fetchMessage } from '../actions/messageActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { fetchUser } from '../actions/userActions';
import { createChannel } from '../actions/channelActions';
import { selectDrawerMessagesByType } from '../reducers/selectors';
import DrawerSwitch from './Drawer';

const mapStateToProps = (state, { match: { params } }) => ({
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  messages: selectDrawerMessagesByType(state),
  members: state.entities.members,
  channels: state.entities.channels,
  currentUser: state.session.currentUser,
  drawer: state.ui.drawer,
  drawerType: params.drawerType,
  drawerSlug: params.drawerSlug,
  isLoading: state.ui.isDrawerLoading,
});

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  openDrawer: drawer => dispatch(drawerOpen(drawer)),
  closeDrawer: () => dispatch(drawerClose()),
  openProfileModal: () => dispatch(modalOpen('MODAL_PROFILE', null)),
  fetchEntitiesRequest: () => {
    if (params.messageSlug) {
      dispatch(fetchMessage.request(params.messageSlug));
    }

    if (params.userSlug) {
      dispatch(fetchUser.request(params.userSlug));
    }

    if (!params.messageSlug && !params.userSlug) {
      dispatch(fetchFavorites.request(params.workspaceSlug));
    }

    return null;
  },
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch));
