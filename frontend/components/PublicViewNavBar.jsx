import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withWindowResize from './withWindowResize';
import Menu from './Menu';
import './PublicViewNavBar.css';

class PublicViewNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobileSize: false };
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
    const { windowWidth } = this.props;
    const isMobileSize = windowWidth <= 576;

    this.setState({ isMobileSize });
  }

  render() {
    const {
      isLoggedIn,
      signOutRequest,
      subbedWorkspaces,
      openWorkspaceModal,
      closeDropdown,
    } = this.props;
    const { isMobileSize } = this.state;

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

    const mobileMenuItems = sessionMenuItems.concat(workspaceMenuItems);
    const ddItems = isMobileSize ? mobileMenuItems : workspaceMenuItems;

    const menuItems = [].concat(sessionMenuItems);
    menuItems.push({
      key: 'dropdown',
      label: 'Your Workspaces',
      dropdownType: 'DROPDOWN_PUBLIC',
      dropdownChild: <Menu items={ddItems} menuFor="dropdown" bemModifier={menuModifier} />,
      condition: isLoggedIn && subbedWorkspaces && !isMobileSize,
    });

    menuItems.push({
      key: 'dropdown-mobile',
      icon: <FontAwesomeIcon icon="bars" fixedWidth size="lg" />,
      dropdownType: 'DROPDOWN_PUBLIC',
      dropdownChild: <Menu items={ddItems} menuFor="dropdown" bemModifier={menuModifier} />,
      condition: isLoggedIn && isMobileSize,
    });

    return (
      <div className="PublicViewNavBar">
        <div className="PublicView__container">
          <nav className="PublicViewNavBar__nav">
            <Link className="PublicViewNavBar__logo" to="/" rel="home">Slack Clone</Link>
            <Menu menuFor="public" isRow items={menuItems} bemModifier={menuModifier} />
          </nav>
        </div>
      </div>
    );
  }
}

export default withWindowResize(PublicViewNavBar);
