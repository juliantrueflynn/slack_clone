import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import Button from './Button';
import ProfileModal from './ProfileModal';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
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
    } = this.props;
    const subsLen = channel.subs.length;
    const hasTopic = !!channel.topic;
    const isItemActive = drawerType === 'favorites';

    const menuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} size="lg" />,
        onClick: this.handleFavoritesClick,
        isItemActive,
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon={['fas', 'cog']} size="lg" />,
        onClick: this.handleProfileClick,
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
                <Button buttonFor="edit-topic" unStyled>
                  {channel.topic}
                  {hasTopic || <FontAwesomeIcon icon={['far', 'edit']} size="sm" />}
                  {hasTopic || 'Add topic'}
                </Button>
              </div>
            </div>
          </div>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
        {currentUser && (<ProfileModal {...currentUser} />)}
      </header>
    );
  }
}

export default ChannelHeader;
