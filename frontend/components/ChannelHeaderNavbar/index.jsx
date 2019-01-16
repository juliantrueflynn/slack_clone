import React from 'react';
import { faUserCog, faEllipsisV, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBarContainer from '../../containers/SearchBarContainer';
import Menu from '../Menu';
import Button from '../Button';
import RightSidebarModal from '../RightSidebarModal';
import withWindowResize from '../../hoc/withWindowResize';
import './styles.css';

class ChannelHeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarModalOpen: false };
    this.handleLinkToggle = this.handleLinkToggle.bind(this);
    this.handleSidebarModalToggle = this.handleSidebarModalToggle.bind(this);
    this.handleChannelSubToggle = this.handleChannelSubToggle.bind(this);
  }

  handleLinkToggle(pathName) {
    const {
      history,
      drawerType,
      closeDrawer,
      modalType,
      openModal,
      closeModal,
      isMobileSize,
      match: { url, isExact },
    } = this.props;

    if (modalType && !isMobileSize) {
      closeModal();
    }

    if (isMobileSize) {
      openModal('MODAL_DRAWER_MOBILE');
    }

    if (drawerType !== pathName) {
      history.push(`${url}/${pathName}`);
      return;
    }

    if (!isExact && drawerType === pathName) {
      closeDrawer();
      history.push(url);
    }
  }

  handleSidebarModalToggle() {
    const { isSidebarModalOpen } = this.state;

    this.setState({ isSidebarModalOpen: !isSidebarModalOpen });
  }

  handleChannelSubToggle() {
    const {
      chatroom,
      createChatroomSubRequest,
      destroyChatroomSubRequest,
      closeDropdown,
    } = this.props;

    if (chatroom.isSub) {
      destroyChatroomSubRequest();
    } else {
      createChatroomSubRequest(chatroom.id);
    }

    closeDropdown();
  }

  render() {
    const {
      chatroom,
      openChannelEditModal,
      chatTitle,
      drawerType,
      openProfileModal,
      isNotDefaultChannel,
      dmChannelUser,
      closeDropdown,
      match: { url },
    } = this.props;
    const { isSidebarModalOpen } = this.state;

    const ddMenuItems = [
      {
        label: 'View channel details',
        link: `${url}/details`,
        onClick: closeDropdown,
        isOpen: drawerType === 'details',
      },
      {
        label: `View ${chatTitle}’s profile`,
        link: `${url}/team/${dmChannelUser.slug}`,
        onClick: closeDropdown,
        condition: chatroom && chatroom.hasDm,
      },
      {
        label: 'Edit channel',
        onClick: openChannelEditModal,
        condition: chatroom && !chatroom.hasDm,
      },
      {
        label: `Join ${chatTitle}`,
        onClick: this.handleChannelSubToggle,
        condition: chatroom && !chatroom.hasDm && !chatroom.isSub,
      },
      {
        label: `Leave ${chatTitle}`,
        onClick: this.handleChannelSubToggle,
        condition: chatroom && !chatroom.hasDm && chatroom.isSub && isNotDefaultChannel,
      }
    ];

    const channelMenuItems = [
      {
        key: 'details',
        icon: <FontAwesomeIcon icon="info-circle" fixedWidth />,
        onClick: () => this.handleLinkToggle('details'),
        isOpen: drawerType === 'details',
      },
      {
        key: 'edit-dropdown',
        icon: <FontAwesomeIcon icon={faCog} fixedWidth />,
        dropdownType: 'DROPDOWN_CHATROOM_EDIT',
        dropdownChild: <Menu items={ddMenuItems} />
      }
    ];

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon="star" />,
        onClick: () => this.handleLinkToggle('favorites'),
        isOpen: drawerType === 'favorites',
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon={faUserCog} />,
        onClick: openProfileModal,
      },
    ];

    return (
      <nav className="ChannelHeaderNavbar">
        {chatroom && <Menu items={channelMenuItems} menuFor="edit" isRow unStyled />}
        <SearchBarContainer isDisabled />
        <Menu menuFor="header-user" isRow items={userMenuItems} />
        <Button buttonFor="right-sidebar-mobile" unStyled onClick={this.handleSidebarModalToggle}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Button>
        <RightSidebarModal
          isOpen={isSidebarModalOpen}
          drawerType={drawerType}
          toggleLink={this.handleLinkToggle}
          chatroom={chatroom}
          openProfileModal={openProfileModal}
          closeModal={this.handleSidebarModalToggle}
        />
      </nav>
    );
  }
}

export default withWindowResize(ChannelHeaderNavbar);
