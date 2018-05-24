import React from 'react';
import { Link } from 'react-router-dom';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavsClick = this.handleFavsClick.bind(this);
  }

  handleFavsClick() {
    this.props.openRightSidebar({});
  }

  render() {
    const { workspaceSlug, channelSlug } = this.props;
  
    return (
      <header className="ch-header">
        <h1 className="ch-header__name">Channel: {channelSlug}</h1>

        <ul className="ch-header-menu">
          <li className="ch-header-menu__item">
            <Link
              className="ch-header-menu__link"
              to={`/${workspaceSlug}/${channelSlug}/favorites`}
              onClick={this.handleFavsClick}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default ChannelHeader;