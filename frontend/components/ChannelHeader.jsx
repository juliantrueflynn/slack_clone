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
    const matchChat = matchPath(pathname, {
      path: '/:workspaceSlug/(messages)?/:chatPath',
    });

    return matchChat;
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
    const { sectionTitle } = this.props;
    const menuItems = [{ label: 'Favorites', onClick: this.handleFavoritesClick }];

    return (
      <header className="ChannelHeader">
        <div className="ChannelHeader__content">
          <h1 className="ChannelHeader__title">
            {sectionTitle}
          </h1>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
      </header>
    );
  }
}

export default withRouter(ChannelHeader);
