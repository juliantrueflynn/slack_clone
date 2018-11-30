import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Button from './Button';
import SearchModal from './SearchModal';
import RightSidebarModal from './RightSidebarModal';
import './ChannelHeaderNavbar.css';

class ChannelHeaderNavbar extends React.Component {
  handleLinkToggle(pathName) {
    const {
      history,
      drawerType,
      drawerClose,
      match: { url, isExact },
    } = this.props;

    if (drawerType !== pathName) {
      history.push(`${url}/${pathName}`);
      return;
    }

    if (!isExact && drawerType === pathName) {
      drawerClose();
      history.push(url);
    }
  }

  render() {
    const {
      currentUser,
      users,
      messages,
      channelsMap,
      channel,
      chatTitle,
      drawerType,
      modalType,
      modalOpen,
      modalClose,
      isLoading,
      searchQuery,
      destroyChannelSubRequest,
      destroySearch,
      fetchSearchRequest,
      match: { url },
    } = this.props;

    let channelMenuItems = [];
    const searchMessages = messages.filter(msg => msg.isInSearch).sort((a, b) => b.id - a.id);

    if (channel) {
      channelMenuItems = [
        {
          key: 'details',
          icon: <FontAwesomeIcon icon="info-circle" size="lg" fixedWidth />,
          onClick: () => this.handleLinkToggle('details'),
          isItemActive: drawerType === 'details',
        },
        {
          key: 'edit-dropdown',
          icon: <FontAwesomeIcon icon="cog" size="lg" fixedWidth />,
          menuFor: 'channel-edit',
          items: [
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
              onClick: () => modalOpen('MODAL_EDIT_CHANNEL'),
              condition: !channel.hasDm,
            },
            {
              label: `Leave ${chatTitle}`,
              onClick: () => destroyChannelSubRequest(channel.slug),
              condition: !channel.hasDm,
            }
          ],
        }
      ];
    }

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: () => this.handleLinkToggle('favorites'),
        isItemActive: drawerType === 'favorites',
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon="user-cog" size="lg" />,
        onClick: () => modalOpen('MODAL_PROFILE'),
      },
    ];

    return (
      <nav className="ChannelHeaderNavbar">
        {channel && <Menu items={channelMenuItems} menuFor="edit" isRow unStyled />}
        <SearchBar
          query={searchQuery}
          destroySearch={destroySearch}
          modalOpen={modalOpen}
          hasClearIcon
        />
        <Menu menuFor="header-user" isRow items={userMenuItems} />
        <Button buttonFor="right-sidebar-mobile" unStyled onClick={() => modalOpen('MODAL_RIGHT_SIDEBAR')}>
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
            modalClose={modalClose}
          />
        )}
        {modalType === 'MODAL_RIGHT_SIDEBAR' && <RightSidebarModal modalClose={modalClose} />}
      </nav>
    );
  }
}

export default ChannelHeaderNavbar;
