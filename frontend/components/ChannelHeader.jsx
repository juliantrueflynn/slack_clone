import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import ChannelHeaderSearch from './ChannelHeaderSearch';
import ChannelHeaderMeta from './ChannelHeaderMeta';
import ChannelActionMenus from './ChannelActionMenus';
import ProfileModal from './ProfileModal';
import SearchModal from './SearchModal';
import ChannelEditorModal from './ChannelEditorModal';
import './ChannelHeader.css';

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

    const searchMessages = messages.filter(msg => msg.isInSearch).sort((a, b) => b.id - a.id);
    const modalOpenEditChannel = () => modalOpen('MODAL_EDIT_CHANNEL');

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
      <header className="ChannelHeader">
        <div className="ChannelHeader__info">
          <h1 className="ChannelHeader__title">{this.getTitle()}</h1>
          <ChannelHeaderMeta
            channel={channel}
            accordionOpen={accordionOpen}
            modalOpen={modalOpenEditChannel}
            users={users}
          />
        </div>
        <nav className="ChannelHeader__navigate">
          {channel && (
            <ChannelActionMenus
              channel={channel}
              chatTitle={this.getTitle()}
              drawerType={drawerType}
              url={url}
              modalOpen={modalOpenEditChannel}
              destroyChannelSub={destroyChannelSubRequest}
              linkToggle={this.handleLinkToggle}
            />
          )}
          <ChannelHeaderSearch
            query={searchQuery}
            destroySearch={destroySearch}
            modalOpen={modalOpen}
          />
          <Menu menuFor="header-user" isRow items={userMenuItems} />
        </nav>
        <ProfileModal {...currentUser} />
        <SearchModal
          searchQuery={searchQuery}
          messages={searchMessages}
          users={users}
          fetchSearchRequest={fetchSearchRequest}
          destroySearch={destroySearch}
          isSearchLoading={isSearchLoading}
        />
        <ChannelEditorModal currentUser={currentUser} channel={channel} />
      </header>
    );
  }
}

export default ChannelHeader;
