import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, signUp, signIn } from '../actions/sessionActions';
import { fetchWorkspaces } from '../actions/workspaceActions';
import Menu from './Menu';
import Dropdown from './Dropdown';
import withActionCable from './withActionCable';
import { selectSubbedWorkspaces } from '../reducers/selectors';
import './WithPublicView.css';
import CreateWorkspaceModal from './CreateWorkspaceModal';
import { modalOpen } from '../actions/interactiveActions';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser,
  workspaces: Object.values(state.entities.workspaces),
  subbedWorkspaces: selectSubbedWorkspaces(state),
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch, { location }) => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
  modalOpen: modal => dispatch(modalOpen(modal)),
  signOutRequest: () => dispatch(signOut.request()),
  sessionRequest: (user) => {
    if (location.pathname === '/signin') {
      return dispatch(signIn.request(user));
    }

    return dispatch(signUp.request(user));
  },
});

const withPublicView = (WrappedComponent) => {
  class WithPublicView extends React.Component {
    componentDidMount() {
      const { fetchWorkspacesRequest, isLoggedIn } = this.props;

      if (isLoggedIn) {
        fetchWorkspacesRequest();
      }
    }

    render() {
      const {
        signOutRequest,
        isLoggedIn,
        subbedWorkspaces,
        ...props
      } = this.props;
      const { workspaces, location: { pathname } } = props;
      const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';
      const pageClassName = pagePath ? `Page__public--${pagePath}` : '';

      const workspaceItems = subbedWorkspaces.map(({ slug, title }) => ({
        key: slug,
        link: slug,
        label: title,
      }));
      const ddModifierClassName = subbedWorkspaces.length ? 'filled' : 'empty';
      const createWorkspaceItem = {
        key: 'createWorkspace',
        label: 'Create Workspace',
        onClick: () => modalOpen('MODAL_WORKSPACE')
      };
      workspaceItems.push(createWorkspaceItem);

      let navItems = [
        { key: 'signup', label: 'Sign Up', link: '/signup' },
        { key: 'signin', label: 'Sign In', link: '/signin' },
      ];

      if (isLoggedIn) {
        navItems = [{ key: 'signout', label: 'Sign Out', onClick: () => signOutRequest() }];
      }

      return (
        <div className={`Page Page__public ${pageClassName}`}>
          <header className="header Page__header">
            <div className="Page__container">
              <nav className="navbar Page__navbar--public">
                <Link className="Page__logo" to="/" rel="home">
                  Slack Clone
                </Link>
                <Menu menuFor="public" isRow items={navItems} />
                {isLoggedIn && workspaces && (
                  <Dropdown
                    menuFor="workspaces"
                    menuPos="right"
                    togglerText="Your Workspaces"
                    modifier={ddModifierClassName}
                    style={{ fontWeight: 400, borderWidth: '2px' }}
                    items={workspaceItems}
                  />
                )}
              </nav>
            </div>
          </header>
          <WrappedComponent {...this.props} />
          <CreateWorkspaceModal />
        </div>
      );
    }
  }

  return withActionCable(connect(mapStateToProps, mapDispatchToProps)(WithPublicView));
};

export default withPublicView;
