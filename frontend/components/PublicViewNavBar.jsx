import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withWindowResize from './withWindowResize';
import Menu from './Menu';
import Button from './Button';
import DropdownModal from './DropdownModal';
import './PublicViewNavBar.css';

class PublicViewNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDdClick = this.handleDdClick.bind(this);
  }

  handleDdClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.target.getBoundingClientRect();

    openDropdown('DROPDOWN_PUBLIC', { posY, posX });
  }

  render() {
    const {
      isMobileSize,
      isLoggedIn,
      signOutRequest,
      subbedWorkspaces,
      openWorkspaceModal,
      dropdownProps,
      isDdOpen,
      closeDropdown,
    } = this.props;

    const menuModifier = subbedWorkspaces.length ? 'filled' : 'empty';
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
        onClick: signOutRequest,
        condition: isLoggedIn,
      },
    ];
    const workspaceMenuItems = subbedWorkspaces.map(({ slug, title }) => ({
      key: slug,
      link: slug,
      label: title,
    }));
    const createWorkspaceItem = {
      key: 'createWorkspace',
      label: 'Create Workspace',
      onClick: openWorkspaceModal,
    };
    workspaceMenuItems.push(createWorkspaceItem);

    const desktopMenuItems = [].concat(sessionMenuItems);
    desktopMenuItems.push({
      key: 'dropdown',
      label: 'Your Workspaces',
      onClick: this.handleDdClick,
      isOpen: isDdOpen,
      condition: isLoggedIn && subbedWorkspaces,
    });

    const mobileMenuItems = sessionMenuItems.concat(workspaceMenuItems);
    const ddItems = isMobileSize ? mobileMenuItems : workspaceMenuItems;
    const contentStyle = { top: '65px' };

    return (
      <div className="PublicViewNavBar">
        <div className="PublicView__container">
          <nav className="PublicViewNavBar__nav">
            <Link className="PublicViewNavBar__logo" to="/" rel="home">Slack Clone</Link>
            <Menu menuFor="public" isRow items={desktopMenuItems} bemModifier={menuModifier} />
            <Button buttonFor="mobile-public" isActive={isDdOpen} onClick={this.handleDdClick}>
              <FontAwesomeIcon icon="bars" fixedWidth size="lg" />
            </Button>
          </nav>
        </div>
        {isDdOpen && (
          <DropdownModal
            coords={dropdownProps}
            contentStyle={contentStyle}
            close={closeDropdown}
            bemModifier="public"
          >
            <Menu menuFor="dropdown" items={ddItems} bemModifier={menuModifier} />
          </DropdownModal>
        )}
      </div>
    );
  }
}

export default withWindowResize(PublicViewNavBar);
