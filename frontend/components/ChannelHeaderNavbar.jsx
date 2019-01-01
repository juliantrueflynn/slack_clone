import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Button from './Button';
import RightSidebarModal from './RightSidebarModal';
import withWindowResize from './withWindowResize';
import DropdownModalContainer from './DropdownModalContainer';
import './ChannelHeaderNavbar.css';

class ChannelHeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarModalOpen: false };
    this.handleLinkToggle = this.handleLinkToggle.bind(this);
    this.handleDdButtonClick = this.handleDdButtonClick.bind(this);
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
      channel,
      createChannelSubRequest,
      destroyChannelSubRequest,
      closeDropdown,
    } = this.props;

    if (channel.isSub) {
      destroyChannelSubRequest();
    } else {
      createChannelSubRequest(channel.id);
    }

    closeDropdown();
  }

  handleDdButtonClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.currentTarget.getBoundingClientRect();

    openDropdown('DROPDOWN_CHANNEL_EDIT', { posY, posX });
  }

  render() {
    const {
      channel,
      openChannelEditModal,
      chatTitle,
      drawerType,
      openModal,
      searchQuery,
      isNotDefaultChannel,
      destroySearchQuery,
      closeDropdown,
      match: { url },
    } = this.props;
    const { isSidebarModalOpen } = this.state;

    const openModalProfile = () => openModal('MODAL_PROFILE');
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
          onClick: closeDropdown,
        },
        {
          label: `View ${chatTitle}’s profile`,
          link: `${url}/team/${channel.dmUserSlug}`,
          onClick: closeDropdown,
          condition: channel.hasDm,
        },
        {
          label: 'Edit channel',
          onClick: openChannelEditModal,
          condition: !channel.hasDm,
        },
        {
          label: `Join ${chatTitle}`,
          onClick: this.handleChannelSubToggle,
          condition: !channel.hasDm && !channel.isSub,
        },
        {
          label: `Leave ${chatTitle}`,
          onClick: this.handleChannelSubToggle,
          condition: !channel.hasDm && channel.isSub && isNotDefaultChannel,
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
          searchQuery={searchQuery}
          destroySearchQuery={destroySearchQuery}
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
        <DropdownModalContainer dropdownType="DROPDOWN_CHANNEL_EDIT">
          <Menu items={ddMenuItems} />
        </DropdownModalContainer>
      </nav>
    );
  }
}

export default withRouter(withWindowResize(ChannelHeaderNavbar));
