import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Menu from './Menu';
import Dropdown from './Dropdown';
import WorkspaceModal from './WorkspaceModal';
import './PublicView.css';

class PublicView extends React.Component {
  componentDidMount() {
    const { fetchWorkspacesRequest, isLoggedIn, workspacesMap } = this.props;
    const workspaces = Object.values(workspacesMap);

    if (isLoggedIn && (!workspaces || !workspaces.length)) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { workspacesMap, fetchWorkspacesRequest } = this.props;
    const workspaces = Object.values(workspacesMap);
    const prevWorkspaces = Object.values(prevProps.workspacesMap);
    const lastItem = workspaces[workspaces.length - 1];
    const prevLastItem = workspaces[prevWorkspaces.length - 1];

    if (lastItem && prevLastItem && lastItem.id !== prevLastItem.id) {
      fetchWorkspacesRequest();
    }
  }

  render() {
    const {
      isLoggedIn,
      signOutRequest,
      workspacesMap,
      subbedWorkspaces,
      modalOpen,
      modalClose,
      isWorkspaceModalOpen,
      location: { pathname },
      render,
    } = this.props;

    const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';
    const workspaces = Object.values(workspacesMap);
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

    const pageClassNames = classNames('PublicView', {
      [`PublicView__${pagePath}`]: pagePath,
      [`PublicView__${pagePath}--member`]: pagePath && isLoggedIn,
      [`PublicView__${pagePath}--guest`]: pagePath && !isLoggedIn,
    });

    return (
      <div className={pageClassNames}>
        <header className="PublicView__header">
          <div className="PublicView__container">
            <nav className="navbar PublicView__navbar--public">
              <Link className="PublicView__logo" to="/" rel="home">
                Slack Clone
              </Link>
              <Menu menuFor="public" isRow items={navItems} />
              {isLoggedIn && workspaces && (
                <Dropdown
                  menuFor="workspaces"
                  menuPos="right"
                  togglerText="Your Workspaces"
                  modifier={ddModifierClassName}
                  items={workspaceItems}
                />
              )}
            </nav>
          </div>
        </header>
        {render({ workspaces })}
        {isWorkspaceModalOpen && <WorkspaceModal modalClose={modalClose} />}
      </div>
    );
  }
}

export default PublicView;
