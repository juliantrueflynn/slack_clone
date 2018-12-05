import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import WorkspaceModal from './WorkspaceModal';
import DropdownModal from './DropdownModal';
import Button from './Button';
import ScrollBar from './ScrollBar';
import './PublicView.css';

class PublicView extends React.Component {
  constructor(props) {
    super(props);
    this.handleDdClick = this.handleDdClick.bind(this);
  }

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

  handleDdClick(e) {
    const { openDropdown } = this.props;
    const { bottom, right } = e.target.getBoundingClientRect();

    openDropdown('DROPDOWN_PUBLIC', { bottom, right });
  }

  render() {
    const {
      isLoggedIn,
      isMobileSize,
      signOutRequest,
      workspacesMap,
      subbedWorkspaces,
      openModal,
      closeModal,
      dropdownProps,
      closeDropdown,
      isDdOpen,
      isModalOpen,
      location: { pathname },
      render,
    } = this.props;

    const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';
    const sessionMenuItems = [
      {
        key: 'signup',
        label: 'Sign Up',
        link: '/signup',
        onClick: closeDropdown,
        condition: !isLoggedIn,
      },
      {
        key: 'signin',
        label: 'Sign In',
        link: '/signin',
        onClick: closeDropdown,
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
    const menuModifier = subbedWorkspaces.length ? 'filled' : 'empty';
    const workspaceMenuItems = subbedWorkspaces.map(({ slug, title }) => ({
      key: slug,
      link: slug,
      label: title,
    }));
    const createWorkspaceItem = {
      key: 'createWorkspace',
      label: 'Create Workspace',
      onClick: () => openModal('MODAL_WORKSPACE'),
    };
    workspaceMenuItems.push(createWorkspaceItem);

    const desktopMenuItems = [].concat(sessionMenuItems);
    desktopMenuItems.push({
      key: 'dropdown',
      label: 'Your Workspaces',
      onClick: this.handleDdClick,
      condition: isLoggedIn && workspaces,
    });

    const mobileMenuItems = sessionMenuItems.concat(workspaceMenuItems);
    const ddItems = isMobileSize ? mobileMenuItems : workspaceMenuItems;

    const pageClassNames = classNames('PublicView', {
      [`PublicView__${pagePath}`]: pagePath,
      'PublicView--signed-in': isLoggedIn,
      'PublicView--signed-out': !isLoggedIn,
    });

    return (
      <ScrollBar>
        <div className={pageClassNames}>
          <header className="PublicView__header">
            <div className="PublicView__container">
              <nav className="PublicView__navbar">
                <Link className="PublicView__logo" to="/" rel="home">Slack Clone</Link>
                <Menu
                  menuFor="public"
                  isRow
                  items={desktopMenuItems}
                  bemModifier={menuModifier}
                />
                <Button buttonFor="mobile-public" onClick={this.handleDdClick}>
                  <FontAwesomeIcon icon="bars" fixedWidth size="lg" />
                </Button>
              </nav>
            </div>
          </header>
          {render({ workspaces })}
          {isModalOpen && <WorkspaceModal closeModal={closeModal} />}
          {isDdOpen && (
            <DropdownModal
              bemModifier="public"
              menuProps={{ bemModifier: menuModifier }}
              dropdownProps={dropdownProps}
              close={closeDropdown}
              items={ddItems}
            />
          )}
        </div>
      </ScrollBar>
    );
  }
}

export default PublicView;
