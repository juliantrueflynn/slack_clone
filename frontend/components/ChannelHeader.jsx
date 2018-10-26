import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import ChannelHeaderSearch from './ChannelHeaderSearch';
import ChannelHeaderMeta from './ChannelHeaderMeta';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleLinkClick = this.handleToggleLinkClick.bind(this);
  }

  getTitle() {
    const { chatPath, channel } = this.props;

    if (chatPath === 'unreads') {
      return 'All Unreads';
    }

    if (chatPath === 'threads') {
      return 'All Threads';
    }

    if (channel) {
      return channel.hasDm ? channel.title : `#${channel.title}`;
    }

    return null;
  }

  handleToggleLinkClick(pathName) {
    const {
      match: { url, isExact },
      history,
      drawerClose,
      drawerType,
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
      channel,
      accordionOpen,
      drawerType,
      modalOpen,
      fetchSearchRequest,
      searchQuery,
      destroySearch,
      messages,
      users,
      isSearchLoading,
    } = this.props;
    const isFavsOpen = drawerType === 'favorites';
    const isDetailsOpen = drawerType === 'details';
    const modalOpenProfile = () => modalOpen('MODAL_PROFILE');
    const modalOpenEditChannel = () => modalOpen('MODAL_EDIT_CHANNEL');

    const channelMenuItems = [
      {
        key: 'channel-info',
        icon: <FontAwesomeIcon icon="info-circle" size="lg" />,
        onClick: () => this.handleToggleLinkClick('details'),
        isItemActive: isDetailsOpen,
      },
      {
        key: 'channel-edit',
        icon: <FontAwesomeIcon icon="cog" size="lg" />,
        onClick: modalOpenEditChannel,
      },
    ];

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: () => this.handleToggleLinkClick('favorites'),
        isItemActive: isFavsOpen,
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon="user-cog" size="lg" />,
        onClick: modalOpenProfile,
      },
    ];

    return (
      <header className="ChannelHeader">
        <div className="ChannelHeader__content">
          <div className="ChannelHeader__info">
            <h1 className="ChannelHeader__title">
              {this.getTitle()}
            </h1>
            <ChannelHeaderMeta
              channel={channel}
              accordionOpen={accordionOpen}
              modalOpen={modalOpenEditChannel}
              currentUser={currentUser}
            />
          </div>
          <div className="ChannelHeader__navigate">
            <Menu menuFor="header-channel" isRow items={channelMenuItems} />
            <ChannelHeaderSearch
              query={searchQuery}
              destroySearch={destroySearch}
              modalOpen={modalOpen}
            />
            <Menu menuFor="header-user" isRow items={userMenuItems} />
          </div>
        </div>
        <ProfileModal {...currentUser} />
        <SearchModal
          searchQuery={searchQuery}
          messages={messages}
          users={users}
          fetchSearchRequest={fetchSearchRequest}
          destroySearch={destroySearch}
          isSearchLoading={isSearchLoading}
        />
      </header>
    );
  }
}

export default ChannelHeader;
