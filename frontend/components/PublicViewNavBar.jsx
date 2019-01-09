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
    this.state = { left: 0, isMobileSize: false };
    this.handleDdClick = this.handleDdClick.bind(this);
    this.ddToggler = React.createRef();
    this.ddTogglerMobile = React.createRef();
  }

  componentDidMount() {
    this.updateModalStyles();
  }

  componentDidUpdate(prevProps) {
    const { windowWidth } = this.props;

    if (windowWidth !== prevProps.windowWidth) {
      this.updateModalStyles();
    }
  }

  updateModalStyles() {
    if (!this.ddTogglerMobile.current || !this.ddToggler.current) {
      return;
    }

    const { windowWidth } = this.props;
    const isMobileSize = windowWidth <= 576;
    const togglerRef = isMobileSize ? this.ddTogglerMobile : this.ddToggler;
    const { right } = togglerRef.current.getBoundingClientRect();

    this.setState({ left: `${right - 245}px`, isMobileSize });
  }

  handleDdClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.currentTarget.getBoundingClientRect();
    const ddType = e.currentTarget.getAttribute('data-dropdown');

    openDropdown(`DROPDOWN_${ddType}`, { posY, posX });
  }

  render() {
    const {
      isLoggedIn,
      signOutRequest,
      subbedWorkspaces,
      openWorkspaceModal,
      isProfileDdOpen,
      isMobileDdOpen,
      dropdownProps,
      closeDropdown,
    } = this.props;
    const { isMobileSize, left } = this.state;

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

    const menuItems = [].concat(sessionMenuItems);
    menuItems.push({
      key: 'dropdown',
      label: 'Your Workspaces',
      onClick: this.handleDdClick,
      isOpen: isProfileDdOpen,
      itemRef: this.ddToggler,
      'data-dropdown': 'PUBLIC',
      condition: isLoggedIn && subbedWorkspaces,
    });

    const mobileMenuItems = sessionMenuItems.concat(workspaceMenuItems);
    const ddItems = isMobileSize ? mobileMenuItems : workspaceMenuItems;
    const contentStyle = { top: '65px', left };

    return (
      <div className="PublicViewNavBar">
        <div className="PublicView__container">
          <nav className="PublicViewNavBar__nav">
            <Link className="PublicViewNavBar__logo" to="/" rel="home">Slack Clone</Link>
            <Menu menuFor="public" isRow items={menuItems} bemModifier={menuModifier} />
            <Button
              buttonFor="mobile-public"
              isActive={isMobileDdOpen}
              onClick={this.handleDdClick}
              ref={this.ddTogglerMobile}
              data-dropdown="PUBLIC_MOBILE"
            >
              <FontAwesomeIcon icon="bars" fixedWidth size="lg" />
            </Button>
          </nav>
        </div>
        {isProfileDdOpen && (
          <DropdownModal
            coords={dropdownProps}
            contentStyle={contentStyle}
            close={closeDropdown}
            bemModifier="public"
          >
            <Menu menuFor="dropdown" items={ddItems} bemModifier={menuModifier} />
          </DropdownModal>
        )}
        {isMobileDdOpen && (
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
