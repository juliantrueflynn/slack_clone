import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, signUp, signIn } from '../actions/sessionActions';
import { fetchWorkspaces } from '../actions/workspaceActions';
import { updateDropdown, updateModal } from '../actions/uiActions';
import { selectSubbedWorkspaces } from '../reducers/selectors';
import withDetectMobileView from './withDetectMobileView';
import PublicView from './PublicView';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser,
  workspacesMap: state.entities.workspaces,
  subbedWorkspaces: selectSubbedWorkspaces(state),
  currentUser: state.session.currentUser,
  isModalOpen: state.ui.displayModal.modalType === 'MODAL_WORKSPACE',
  isDdOpen: state.ui.dropdown.dropdownType === 'DROPDOWN_PUBLIC',
  dropdownProps: state.ui.dropdown.dropdownProps,
});

const mapDispatchToProps = (dispatch, { location }) => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  openModal: (modalType, modalProps) => dispatch(updateModal(modalType, modalProps)),
  closeModal: () => dispatch(updateModal(null)),
  openDropdown: (ddType, ddProps) => dispatch(updateDropdown(ddType, ddProps)),
  closeDropdown: () => dispatch(updateDropdown(null)),
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
      render={content => <WrappedComponent content={content} {...props} />}
    />
  );

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithPublicView.displayName = `withPublicView(${wrappedComponentName})`;

  return withRouter(
    withDetectMobileView(connect(mapStateToProps, mapDispatchToProps)(WithPublicView))
  );
};

export default withPublicView;
