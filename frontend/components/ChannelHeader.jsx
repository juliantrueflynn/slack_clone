import React from 'react';
import Menu from './Menu';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
  }

  handleFavoritesClick() {
    const { isFavoritesOpen, rightSidebarClose } = this.props;
    if (isFavoritesOpen) rightSidebarClose();
  }

  render() {
    const { favoritesUrl, sectionTitle, ...props } = this.props;
    const menuItems = [
      { label: 'Favorites', onClick: this.handleFavoritesClick, link: favoritesUrl }
    ];

    return (
      <header className="ChannelHeader">
        <div className="ChannelHeader__content">
          <h1 className="ChannelHeader__title">
            {sectionTitle}
          </h1>
          <div className="ChannelHeader__subheader">
            {props.children}
          </div>
          <Menu menuFor="channel-header" isRow items={menuItems} />
        </div>
      </header>
    );
  }
}

export default ChannelHeader;
