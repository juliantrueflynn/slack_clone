import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Button from './Button';
import RightSidebarModal from './RightSidebarModal';
import withWindowResize from './withWindowResize';
import './ChannelHeaderNavbar.css';

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

  render() {
    const {
      channel,
      openChannelEditModal,
      chatTitle,
      drawerType,
      openModal,
      searchQuery,
      isNotDefaultChannel,
      dmChannelUser,
      destroySearchQuery,
      closeDropdown,
      match: { url },
    } = this.props;
    const { isSidebarModalOpen } = this.state;
    const openModalProfile = () => openModal('MODAL_PROFILE');

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
        condition: channel && channel.hasDm,
      },
      {
        label: 'Edit channel',
        onClick: openChannelEditModal,
        condition: channel && !channel.hasDm,
      },
      {
        label: `Join ${chatTitle}`,
        onClick: this.handleChannelSubToggle,
        condition: channel && !channel.hasDm && !channel.isSub,
      },
      {
        label: `Leave ${chatTitle}`,
        onClick: this.handleChannelSubToggle,
        condition: channel && !channel.hasDm && channel.isSub && isNotDefaultChannel,
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
        icon: <FontAwesomeIcon icon="cog" fixedWidth />,
        dropdownType: 'DROPDOWN_CHANNEL_EDIT',
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
        <RightSidebarModal
          isOpen={isSidebarModalOpen}
          drawerType={drawerType}
          toggleLink={this.handleLinkToggle}
          channel={channel}
          openModalProfile={openModalProfile}
          closeModal={this.handleSidebarModalToggle}
        />
      </nav>
    );
  }
}

export default withWindowResize(ChannelHeaderNavbar);
