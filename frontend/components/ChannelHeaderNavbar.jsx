import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Button from './Button';
import SearchModal from './SearchModal';
import RightSidebarModal from './RightSidebarModal';
import DropdownModal from './DropdownModal';
import withWindowResize from './withWindowResize';
import './ChannelHeaderNavbar.css';

class ChannelHeaderNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkToggle = this.handleLinkToggle.bind(this);
    this.handleDdButtonClick = this.handleDdButtonClick.bind(this);
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

  handleDdButtonClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.currentTarget.getBoundingClientRect();

    openDropdown('DROPDOWN_CHANNEL_EDIT', { posY, posX });
  }

  render() {
    const {
      currentUser,
      users,
      searchMessages,
      channelsMap,
      channel,
      chatTitle,
      drawerType,
      modalType,
      openModal,
      closeModal,
      isLoading,
      searchQuery,
      destroyChannelSubRequest,
      destroySearch,
      fetchSearchRequest,
      isDdOpen,
      dropdownProps,
      closeDropdown,
      match: { url },
    } = this.props;

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
          onClick: () => openModal('MODAL_FORM_CHANNEL'),
          condition: !channel.hasDm,
        },
        {
          label: `Leave ${chatTitle}`,
          onClick: () => destroyChannelSubRequest(channel.slug),
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
        onClick: () => openModal('MODAL_PROFILE'),
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
        <Button buttonFor="right-sidebar-mobile" unStyled onClick={() => openModal('MODAL_RIGHT_SIDEBAR')}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </Button>
        {modalType === 'MODAL_SEARCH' && (
          <SearchModal
            searchQuery={searchQuery}
            messages={searchMessages}
            users={users}
            channelsMap={channelsMap}
            currentUserId={currentUser.id}
            fetchSearchRequest={fetchSearchRequest}
            destroySearch={destroySearch}
            isSearchLoading={isLoading}
            closeModal={closeModal}
          />
        )}
        {modalType === 'MODAL_RIGHT_SIDEBAR' && (
          <RightSidebarModal
            drawerType={drawerType}
            toggleLink={this.handleLinkToggle}
            channel={channel}
            openModal={openModal}
            closeModal={closeModal}
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
