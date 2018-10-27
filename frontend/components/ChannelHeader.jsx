import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import ChannelHeaderSearch from './ChannelHeaderSearch';
import ChannelHeaderMeta from './ChannelHeaderMeta';
import Dropdown from './Dropdown';
import './ChannelHeader.css';
import Button from './Button';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkToggle = this.handleLinkToggle.bind(this);
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

  handleLinkToggle(pathName) {
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
      destroyChannelSubRequest,
      match: { url },
    } = this.props;

    const chatTitle = this.getTitle();
    const isFavsOpen = drawerType === 'favorites';
    const isDetailsOpen = drawerType === 'details';
    const modalOpenProfile = () => modalOpen('MODAL_PROFILE');
    const modalOpenEditChannel = () => modalOpen('MODAL_EDIT_CHANNEL');
    const leaveChannel = () => {
      const channelSub = { id: channel.subId, channelSlug: channel.slug };
      destroyChannelSubRequest(channelSub);
    };

    let editMenuItems = [];
    const ddItems = [
      {
        label: 'View channel details',
        link: `${url}/details`,
        hasNoDrawer: true,
      }
    ];
    if (channel && !channel.hasDm) {
      editMenuItems = ddItems.concat([
        { label: 'Edit channel', onClick: modalOpenEditChannel },
        { label: `Leave ${chatTitle}`, onClick: leaveChannel },
      ]);
    }

    if (channel && channel.hasDm) {
      editMenuItems = ddItems.concat([
        {
          label: `View ${chatTitle}’s profile`,
          link: `${url}/team/${channel.dmUserSlug}`,
          hasNoDrawer: true,
        }
      ]);
    }

    const userMenuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: () => this.handleLinkToggle('favorites'),
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
            <h1 className="ChannelHeader__title">{chatTitle}</h1>
            <ChannelHeaderMeta
              channel={channel}
              accordionOpen={accordionOpen}
              modalOpen={modalOpenEditChannel}
              currentUser={currentUser}
            />
          </div>
          <div className="ChannelHeader__navigate">
            {channel && (
              <Button
                buttonFor="channel-details"
                onClick={() => this.handleLinkToggle('details')}
                isActive={isDetailsOpen}
                unStyled
              >
                <FontAwesomeIcon icon="info-circle" size="lg" />
              </Button>
            )}
            {channel && (
              <Dropdown menuFor="channel-edit" items={editMenuItems} unStyled>
                <FontAwesomeIcon icon="cog" size="lg" />
              </Dropdown>
            )}
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
