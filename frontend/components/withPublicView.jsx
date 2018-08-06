import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, signUp, signIn } from '../actions/sessionActions';
import { fetchWorkspaces } from '../actions/workspaceActions';
import Menu from './Menu';
import Dropdown from './Dropdown';
import './WithPublicView.css';

const mapStateToProps = state => ({
  isLoggedIn: !!state.session.currentUser,
  workspaces: Object.values(state.entities.workspaces),
});

const mapDispatchToProps = (dispatch, { location }) => ({
  fetchWorkspacesRequest: () => dispatch(fetchWorkspaces.request()),
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
      if (isLoggedIn) fetchWorkspacesRequest();
    }

    render() {
      const { signOutRequest, isLoggedIn, ...props } = this.props;
      const { workspaces, location: { pathname } } = props;
      const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';
      const pageClassName = pagePath ? `Page__public--${pagePath}` : '';
      const workspaceItems = workspaces && workspaces.map(item => ({
        key: item.slug,
        link: item.slug,
        label: item.title,
      }));

      let navItems = [
        { key: 'signup', label: 'Sign up', link: '/signup' },
        { key: 'signin', label: 'Sign in', link: '/signin' },
      ];

      if (isLoggedIn) {
        navItems = [
          { key: 'signup', label: 'Sign out', onClick: () => signOutRequest() },
        ];
      }

      return (
        <div className={`Page Page__public ${pageClassName}`}>
          <header className="header Page__header">
            <div className="Page__container">
              <nav className="navbar Page__navbar--public">
                <Link className="navbar__logo" to="/" rel="home">
                  Slack Clone
                </Link>

                <Menu menuFor="public" isRow items={navItems} />
                {isLoggedIn && workspaces && (
                  <Dropdown
                    menuFor="workspaces"
                    menuPos="right"
                    togglerText="Your Workspaces"
                    items={workspaceItems}
                  />
                )}
              </nav>
            </div>
          </header>
          <WrappedComponent {...props} />
        </div>
      );
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WithPublicView));
};

export default withPublicView;
