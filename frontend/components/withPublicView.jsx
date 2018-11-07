import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, signUp, signIn } from '../actions/sessionActions';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { modalOpen, modalClose } from '../actions/uiActions';
import { selectSubbedWorkspaces } from '../reducers/selectors';
import PublicView from './PublicView';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser,
  workspacesMap: state.entities.workspaces,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  currentUser: state.session.currentUser,
  isWorkspaceModalOpen: state.ui.displayModal.modalType,
});

const mapDispatchToProps = (dispatch, { location }) => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  modalOpen: (modalType, modalProps) => dispatch(modalOpen(modalType, modalProps)),
  modalClose: () => dispatch(modalClose()),
  signOutRequest: () => dispatch(signOut.request()),
  sessionRequest: (user) => {
    if (location.pathname === '/signin') {
      return dispatch(signIn.request(user));
    }

    return dispatch(signUp.request(user));
  },
});

const withPublicView = (WrappedComponent) => {
  const WithPublicView = props => (
    <PublicView
      {...props}
      render={content => (
        <WrappedComponent content={content} {...props} />
      )}
    />
  );

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithPublicView.displayName = `withPublicView(${wrappedComponentName})`;

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithPublicView));
};

export default withPublicView;
