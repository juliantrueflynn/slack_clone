import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { drawerClose, drawerOpen, modalOpen } from '../actions/uiActions';
import { fetchMessage } from '../actions/messageActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { fetchUser } from '../actions/userActions';
import { createChannel, fetchChannel } from '../actions/channelActions';
import { selectDrawerMessagesByType, selectChannelWithEntitiesBySlug } from '../reducers/selectors';
import DrawerSwitch from './Drawer';

const mapStateToProps = (state, { match: { params } }) => ({
  isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
  messages: selectDrawerMessagesByType(state),
  members: state.entities.members,
  channels: state.entities.channels,
  channel: selectChannelWithEntitiesBySlug(state, params.chatPath),
  currentUser: state.session.currentUser,
  drawer: state.ui.drawer,
  drawerType: params.drawerType,
  drawerSlug: params.drawerSlug,
  accordion: state.ui.accordion.details,
  isLoading: state.ui.isDrawerLoading,
});

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  openDrawer: drawer => dispatch(drawerOpen(drawer)),
  closeDrawer: () => dispatch(drawerClose()),
  openProfileModal: () => dispatch(modalOpen('MODAL_PROFILE', null)),
  createChannelRequest: dmChat => dispatch(createChannel.request(dmChat)),
  fetchEntitiesRequest: () => {
    let entitySlug = params.drawerSlug;
    let fetchEntity;
    switch (params.drawerType) {
      case 'convo':
        fetchEntity = fetchMessage.request;
        break;
      case 'team':
        fetchEntity = fetchUser.request;
        break;
      case 'favorites':
        entitySlug = params.workspaceSlug;
        fetchEntity = fetchFavorites.request;
        break;
      case 'details':
        if (!params.chatPath) {
          return null;
        }

        entitySlug = params.chatPath;
        fetchEntity = fetchChannel.request;
        break;
      default:
        return null;
    }

    return dispatch(fetchEntity(entitySlug));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerSwitch));
