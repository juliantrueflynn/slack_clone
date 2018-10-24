import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import Button from './Button';
import ProfileModal from './ProfileModal';
import ChannelEditorModal from './ChannelEditorModal';
import SearchModal from './SearchModal';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleLinkClick = this.handleToggleLinkClick.bind(this);
    this.handleDetailsAccordionClick = this.handleDetailsAccordionClick.bind(this);
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

  handleDetailsAccordionClick() {
    const {
      accordionOpen,
      accordionToggle,
      drawerType,
    } = this.props;

    if (drawerType === 'details') {
      accordionToggle();
    } else {
      accordionOpen();
    }
  }

  render() {
    const {
      currentUser,
      channel,
      drawerType,
      modalOpen,
      fetchSearchRequest,
      destroySearch,
      messages,
      users,
      isSearchLoading,
      match: { url },
    } = this.props;
    const subsLen = channel && channel.members.length;
    const hasTopic = !!(channel && channel.topic);
    const isFavsOpen = drawerType === 'favorites';
    const isDetailsOpen = drawerType === 'details';
    const modalOpenProfile = () => modalOpen('MODAL_PROFILE');
    const modalOpenEditChannel = () => modalOpen('MODAL_EDIT_CHANNEL');
    const modalOpenSearch = () => modalOpen('MODAL_SEARCH');

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
            <div className="ChannelHeader__meta">
              {channel && (
                <div className="ChannelHeader__meta-item">
                  <Link to={`${url}/details`} onClick={this.handleDetailsAccordionClick}>
                    <FontAwesomeIcon icon={['far', 'user']} size="sm" />
                    {subsLen}
                  </Link>
                </div>
              )}
              {channel && (
                <div className="ChannelHeader__meta-item ChannelHeader__meta-item-topic">
                  <Button onClick={modalOpenEditChannel} buttonFor="edit-topic" unStyled>
                    {channel.topic}
                    {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
                    {hasTopic || 'Add topic'}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="ChannelHeader__navigate">
            <Menu menuFor="header-channel" isRow items={channelMenuItems} />
            <Button onClick={modalOpenSearch} buttonFor="nav-search" unStyled>
              <FontAwesomeIcon icon="search" size="lg" />
              <span className="Btn__nav-search-txt">Search</span>
            </Button>
            <Menu menuFor="header-user" isRow items={userMenuItems} />
          </div>
        </div>
        <ProfileModal {...currentUser} />
        {channel && <ChannelEditorModal channel={channel} />}
        <SearchModal
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
