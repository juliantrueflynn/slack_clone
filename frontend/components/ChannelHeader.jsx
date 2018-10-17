import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import Button from './Button';
import ProfileModal from './ProfileModal';
import './ChannelHeader.css';
import ChannelEditorModal from './ChannelEditorModal';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
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

  handleFavoritesClick() {
    const {
      match: { url, isExact },
      history,
      drawerClose,
      drawerType,
    } = this.props;

    if (drawerType !== 'favorites') {
      history.push(`${url}/favorites`);
      return;
    }

    if (!isExact && drawerType === 'favorites') {
      drawerClose();
      history.push(url);
    }
  }

  handleProfileClick() {
    const { modalOpen } = this.props;
    modalOpen('MODAL_PROFILE');
  }

  render() {
    const {
      currentUser,
      channel,
      drawerType,
      modalOpen,
    } = this.props;
    const subsLen = channel.subs.length;
    const hasTopic = !!channel.topic;
    const isItemActive = drawerType === 'favorites';
    const modalOpenProfile = () => modalOpen('MODAL_PROFILE');
    const modalOpenEditChannel = () => modalOpen('MODAL_EDIT_CHANNEL');

    const menuItems = [
      {
        key: 'edit-channel',
        icon: <FontAwesomeIcon icon={['fas', 'cog']} size="lg" />,
        onClick: modalOpenEditChannel,
      },
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: this.handleFavoritesClick,
        isItemActive,
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon={['fas', 'user-cog']} size="lg" />,
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
              <div className="ChannelHeader__meta-item">
                <FontAwesomeIcon icon={['far', 'user']} size="sm" />
                {subsLen}
              </div>
              <div className="ChannelHeader__meta-item ChannelHeader__meta-item-topic">
                <Button onClick={modalOpenEditChannel} buttonFor="edit-topic" unStyled>
                  {channel.topic}
                  {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
                  {hasTopic || 'Add topic'}
                </Button>
              </div>
            </div>
          </div>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
        <ProfileModal {...currentUser} />
        {channel && <ChannelEditorModal channel={channel} />}
      </header>
    );
  }
}

export default ChannelHeader;
