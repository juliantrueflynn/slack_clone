import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopBarHeader.css';

class TopBarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
  }

  handleFavoritesClick() {
    if (this.props.isFavoritesOpen) this.props.rightSidebarClose();
  }

  render() {
    const { favoritesUrl, sectionTitle, ...props } = this.props;

    return (
      <header className="top-bar-header">
        <h1 className="top-bar-header__title">{sectionTitle}</h1>
        <div className="top-bar-subheader">{props.children}</div>
        <ul className="top-bar-menu">
          <li className="top-bar-menu__item">
            <NavLink to={favoritesUrl} onClick={this.handleFavoritesClick}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

export default TopBarHeader;
