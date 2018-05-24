import React from 'react';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavsToggle = this.handleFavsToggle.bind(this);
  }

  handleFavsToggle() {
    const { workspaceSlug, channelSlug, rightSidebar } = this.props;

    if (rightSidebar && rightSidebar.sidebarType === 'Favorites') {
      this.props.closeRightSidebar();
      this.props.navigate(`/${workspaceSlug}/${channelSlug}`);
    } else {
      this.props.openRightSidebar();
      this.props.navigate(`/${workspaceSlug}/${channelSlug}/favorites`);
    }
  }

  render() {
    const { workspaceSlug, channelSlug } = this.props;
  
    return (
      <header className="ch-header">
        <h1 className="ch-header__name">Channel: {channelSlug}</h1>

        <ul className="ch-header-menu">
          <li className="ch-header-menu__item">
            <button
              className="btn btn__favs"
              onClick={this.handleFavsToggle}
            >
              Favorites
            </button>
          </li>
        </ul>
      </header>
    );
  }
}

export default ChannelHeader;