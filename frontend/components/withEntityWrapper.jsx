import React from 'react';
import { connect } from 'react-redux';
import { fetchWorkspace } from '../actions/workspaceActions';
import { fetchUnreads } from '../actions/unreadActions';
import { fetchUserThreads, fetchMessages, fetchMessage } from '../actions/messageActions';
import { fetchChannel } from '../actions/channelActions';
import { fetchFavorites } from '../actions/favoriteActions';
import { fetchUser } from '../actions/userActions';
import { selectCurrentEntity } from '../reducers/selectors';
import EntityWrapper from './EntityWrapper';

const withEntityWrapper = ({ entityName, pathName }) => (WrappedComponent) => {
  const mapStateToProps = (state, { match: { params } }) => ({
    entityName,
    pathName,
    entitySlug: params[pathName],
    entity: selectCurrentEntity(state, entityName, params[pathName]),
    users: state.entities.members,
    currentUser: state.session.currentUser,
  });

  const mapDispatchToProps = (dispatch, { match }) => ({
    fetchEntityRequest: () => {
      const {
        workspaceSlug,
        chatPath,
        0: drawerParent,
        drawerType,
        drawerSlug,
      } = match.params;
      let slug;
      let fetchEntity;

      if (pathName === 'workspaceSlug') {
        slug = workspaceSlug;
        fetchEntity = fetchWorkspace.request;
      }

      if (pathName === 'chatPath') {
        slug = workspaceSlug;

        if (chatPath === 'unreads') {
          fetchEntity = fetchUnreads.request;
        } else if (chatPath === 'threads') {
          fetchEntity = fetchUserThreads.request;
        } else {
          slug = chatPath;
          fetchEntity = fetchMessages.request;
        }
      }

      if (pathName === 'drawerSlug') {
        slug = drawerSlug;

        if (drawerType === 'convo') {
          fetchEntity = fetchMessage.request;
        } else if (drawerType === 'team') {
          fetchEntity = fetchUser.request;
        } else if (drawerType === 'favorites') {
          slug = workspaceSlug;
          fetchEntity = fetchFavorites.request;
        } else if (drawerType === 'details' && drawerParent) {
          const splitPath = drawerParent.split('/');
          slug = splitPath[1];
          fetchEntity = fetchChannel.request;
        }
      }

      if (!fetchEntity) {
        return null;
      }

      return dispatch(fetchEntity(slug));
    },
  });

  const WithEntityWrapper = props => (
    <EntityWrapper
      {...props}
      render={entity => (
        <WrappedComponent entity={entity} {...props} />
      )}
    />
  );

  return connect(mapStateToProps, mapDispatchToProps)(WithEntityWrapper);
};

export default withEntityWrapper;
