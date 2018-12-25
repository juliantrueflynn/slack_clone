import React from 'react';
import { connect } from 'react-redux';
import { fetchWorkspace } from '../actions/workspaceActions';
import { fetchUnreads } from '../actions/readActions';
import { fetchUserThreads, fetchMessages } from '../actions/messageActions';
import EntityWrapper from './EntityWrapper';

const withEntityWrapper = pathName => (WrappedComponent) => {
  const mapStateToProps = (state, { match: { params } }) => ({
    [pathName]: params[pathName],
    entitySlug: params[pathName],
    users: state.entities.members,
    currentUser: state.session.currentUser,
    isLoading: state.isLoading,
  });

  const mapDispatchToProps = (dispatch, { match }) => ({
    fetchEntityRequest: () => {
      const { workspaceSlug, chatPath } = match.params;
      let slug;
      let fetchEntity;

      if (pathName === 'workspaceSlug') {
        slug = workspaceSlug;
        fetchEntity = fetchWorkspace;
      }

      if (pathName === 'chatPath') {
        slug = workspaceSlug;

        if (chatPath === 'unreads') {
          fetchEntity = fetchUnreads;
        } else if (chatPath === 'threads') {
          fetchEntity = fetchUserThreads;
        } else {
          slug = chatPath;
          fetchEntity = fetchMessages;
        }
      }

      if (!fetchEntity) {
        return null;
      }

      return dispatch(fetchEntity.request(slug));
    },
  });

  const WithEntityWrapper = ({ entitySlug, ...props }) => (
    <EntityWrapper
      entitySlug={entitySlug}
      {...props}
      render={entity => (
        <WrappedComponent entity={entity} {...props} />
      )}
    />
  );

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithEntityWrapper.displayName = `withEntityWrapper(${wrappedComponentName})`;

  return connect(mapStateToProps, mapDispatchToProps)(WithEntityWrapper);
};

export default withEntityWrapper;
