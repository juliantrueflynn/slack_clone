import React from 'react';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
  }

  handleFavoritesClick() {
    const { history, match: { isExact, url }, drawerClose } = this.props;

    if (isExact) {
      history.push(`${url}/favorites`);
    } else {
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
