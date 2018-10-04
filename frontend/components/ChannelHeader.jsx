import React from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import Menu from './Menu';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
  }

  getMatch() {
    const { location: { pathname } } = this.props;
    const _defaultMatch = { params: {} };
    const matchChat = matchPath(pathname, {
      path: '/:workspaceSlug/(messages)?/:chatPath',
    });

    return matchChat || _defaultMatch;
  }

  getTitle() {
    const { channels } = this.props;
    const { params: { chatPath } } = this.getMatch();

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
    const { history, drawerClose, drawerType } = this.props;
    const { url, isExact } = this.getMatch();

    if (drawerType !== 'favorites') {
      history.push(`${url}/favorites`);
      return;
    }

    if (!isExact && drawerType === 'favorites') {
      drawerClose();
      history.push(url);
    }
  }

  render() {
    const menuItems = [{ label: 'Favorites', onClick: this.handleFavoritesClick }];

    return (
      <header className="ChannelHeader">
        <div className="ChannelHeader__content">
          <h1 className="ChannelHeader__title">
            {this.getTitle()}
          </h1>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
      </header>
    );
  }
}

export default withRouter(ChannelHeader);
