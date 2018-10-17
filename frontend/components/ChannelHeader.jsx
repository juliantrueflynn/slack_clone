import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu';
import './ChannelHeader.css';
import ProfileModal from './ProfileModal';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  getTitle() {
    const { channels, chatPath } = this.props;

    if (chatPath === 'unreads') {
      return 'All Unreads';
    }

    if (chatPath === 'threads') {
      return 'All Threads';
    }

    const channel = channels[chatPath];
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
    const { currentUser } = this.props;

    const menuItems = [
      {
        key: 'favorites',
        icon: <FontAwesomeIcon icon={['fas', 'star']} fixedWidth />,
        onClick: this.handleFavoritesClick,
      },
      {
        key: 'profile',
        icon: <FontAwesomeIcon icon={['fas', 'cog']} fixedWidth />,
        onClick: this.handleProfileClick,
      },
    ];

    return (
      <header className="ChannelHeader">
        <div className="ChannelHeader__content">
          <h1 className="ChannelHeader__title">
            {this.getTitle()}
          </h1>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
        {currentUser && (<ProfileModal {...currentUser} />)}
      </header>
    );
  }
}

export default ChannelHeader;
