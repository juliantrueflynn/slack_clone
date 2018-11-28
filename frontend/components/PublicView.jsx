import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    const sessionMenuItems = [
      {
        key: 'signup',
        label: 'Sign Up',
        link: '/signup',
        condition: !isLoggedIn,
      },
      {
        key: 'signin',
        label: 'Sign In',
        link: '/signin',
        condition: !isLoggedIn,
      },
      {
        key: 'signout',
        label: 'Sign Out',
        onClick: () => signOutRequest(),
        condition: isLoggedIn,
      },
    ];

    const workspaces = Object.values(workspacesMap);
    const modifierClassName = subbedWorkspaces.length ? 'filled' : 'empty';
    const workspaceMenuItems = subbedWorkspaces.map(({ slug, title }) => ({
      key: slug,
      link: slug,
      label: title,
    }));
    const createWorkspaceItem = {
      key: 'createWorkspace',
      label: 'Create Workspace',
      onClick: () => modalOpen('MODAL_WORKSPACE')
    };
    workspaceMenuItems.push(createWorkspaceItem);

    const desktopMenuItems = [].concat(sessionMenuItems);
    desktopMenuItems.push({
      key: 'workspace-dropdown',
      menuFor: 'workspaces',
      menuPos: 'right',
      togglerText: 'Your Workspaces',
      modifier: modifierClassName,
      items: workspaceMenuItems,
      condition: isLoggedIn && workspaces,
    });

    const mobileMenuItems = sessionMenuItems.concat(workspaceMenuItems);

    const pageClassNames = classNames('PublicView', {
      [`PublicView__${pagePath}`]: pagePath,
      'PublicView--signed-in': isLoggedIn,
      'PublicView--signed-out': !isLoggedIn,
    });

    return (
      <div className={pageClassNames}>
        <header className="PublicView__header">
          <div className="PublicView__container">
            <nav className="PublicView__navbar">
              <Link className="PublicView__logo" to="/" rel="home">Slack Clone</Link>
              <Menu menuFor="public" isRow items={desktopMenuItems} />
              <Dropdown
                menuFor="mobile-public"
                items={mobileMenuItems}
                menuPos="right"
                modifier={modifierClassName}
              >
                <FontAwesomeIcon icon="bars" fixedWidth size="lg" />
              </Dropdown>
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
