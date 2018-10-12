import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { drawerClose, drawerOpen } from '../actions/uiActions';
import { fetchMessage } from '../actions/messageActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { fetchMember, updateAvatar } from '../actions/memberActions';
import { createDmChat } from '../actions/channelActions';
import { selectDrawerMessagesByType } from '../reducers/selectors';
import Drawer from './Drawer';

const withDrawer = drawerTitle => (WrappedComponent) => {
  const mapStateToProps = state => ({
    isWorkspaceLoaded: !!state.ui.displayWorkspaceSlug,
    messages: selectDrawerMessagesByType(state),
    members: state.entities.members,
    channels: state.entities.channels,
    currentUser: state.session.currentUser,
    drawer: state.ui.drawer,
    isLoading: state.ui.isDrawerLoading,
  });

  const mapDispatchToProps = (dispatch, { match: { params } }) => ({
    openDrawer: drawer => dispatch(drawerOpen(drawer)),
    closeDrawer: () => dispatch(drawerClose()),
    fetchEntitiesRequest: () => {
      if (params.messageSlug) {
        dispatch(fetchMessage.request(params.messageSlug));
      }

      if (params.userSlug) {
        dispatch(fetchMember.request(params.userSlug));
      }

      if (!params.messageSlug && !params.userSlug) {
        dispatch(fetchFavorites.request(params.workspaceSlug));
      }

      return null;
    },
    createDmChatRequest: dmChat => dispatch(createDmChat.request(dmChat)),
    updateAvatarRequest: imageUrl => dispatch(updateAvatar.request(imageUrl)),
  });

  const WithDrawer = ({
    isWorkspaceLoaded,
    openDrawer,
    closeDrawer,
    drawer,
    fetchEntitiesRequest,
    ...props
  }) => {
    if (!isWorkspaceLoaded) {
      return null;
    }

    const { isLoading } = props;

    return (
      <Drawer
        drawerTitle={drawerTitle}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        drawer={drawer}
        fetchEntitiesRequest={fetchEntitiesRequest}
        isLoading={isLoading}
        render={drawerProps => (
          <WrappedComponent drawer={drawerProps} {...props} />
        )}
      />
    );
  };

  WithDrawer.displayName = `withDrawer(${WithDrawer.displayName || WithDrawer.name})`;

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithDrawer));
};

export default withDrawer;
