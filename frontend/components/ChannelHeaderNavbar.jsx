import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Button from './Button';
import RightSidebarModal from './RightSidebarModal';
import DropdownModal from './DropdownModal';
import withWindowResize from './withWindowResize';
import './ChannelHeaderNavbar.css';

class ChannelHeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarModalOpen: false };
    this.handleLinkToggle = this.handleLinkToggle.bind(this);
    this.handleDdButtonClick = this.handleDdButtonClick.bind(this);
    this.handleSidebarModalToggle = this.handleSidebarModalToggle.bind(this);
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

  handleDdButtonClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.currentTarget.getBoundingClientRect();

    openDropdown('DROPDOWN_CHANNEL_EDIT', { posY, posX });
  }

  render() {
    const {
      user,
      channel,
      openChatEditModal,
      chatTitle,
      drawerType,
      openModal,
      searchQuery,
      destroyChannelSubRequest,
      destroySearch,
      isDdOpen,
      dropdownProps,
      closeDropdown,
      match: { url },
    } = this.props;
    const { isSidebarModalOpen } = this.state;

    const openModalProfile = () => openModal('MODAL_PROFILE', { user });
    let channelMenuItems = [];
    let ddMenuItems = [];

    if (channel) {
      channelMenuItems = [
        {
          key: 'details',
          icon: <FontAwesomeIcon icon="info-circle" fixedWidth />,
          onClick: () => this.handleLinkToggle('details'),
          isItemActive: drawerType === 'details',
        },
        {
          key: 'edit-dropdown',
          icon: <FontAwesomeIcon icon="cog" fixedWidth />,
          onClick: this.handleDdButtonClick,
        }
      ];

      ddMenuItems = [
        {
          label: 'View channel details',
          link: `${url}/details`,
          hasNoDrawer: true,
        },
        {
          label: `View ${chatTitle}’s profile`,
          link: `${url}/team/${channel.dmUserSlug}`,
          hasNoDrawer: true,
          condition: channel.hasDm,
        },
        {
          label: 'Edit channel',
          onClick: openChatEditModal,
          condition: !channel.hasDm,
        },
        {
          label: `Leave ${chatTitle}`,
          onClick: destroyChannelSubRequest,
          condition: !channel.hasDm,
        }
      ];
    }

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon="star" />,
        onClick: () => this.handleLinkToggle('favorites'),
        isItemActive: drawerType === 'favorites',
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon="user-cog" />,
        onClick: openModalProfile,
      },
    ];

    return (
      <nav className="ChannelHeaderNavbar">
        {channel && <Menu items={channelMenuItems} menuFor="edit" isRow unStyled />}
        <SearchBar
          query={searchQuery}
          destroySearch={destroySearch}
          openModal={openModal}
          hasClearIcon
        />
        <Menu menuFor="header-user" isRow items={userMenuItems} />
        <Button buttonFor="right-sidebar-mobile" unStyled onClick={this.handleSidebarModalToggle}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </Button>
        {isSidebarModalOpen && (
          <RightSidebarModal
            drawerType={drawerType}
            toggleLink={this.handleLinkToggle}
            channel={channel}
            openModalProfile={openModalProfile}
            closeModal={this.handleSidebarModalToggle}
          />
        )}
        {isDdOpen && (
          <DropdownModal coordinates={dropdownProps} close={closeDropdown}>
            <Menu items={ddMenuItems} />
          </DropdownModal>
        )}
      </nav>
    );
  }
}

export default withWindowResize(ChannelHeaderNavbar);
