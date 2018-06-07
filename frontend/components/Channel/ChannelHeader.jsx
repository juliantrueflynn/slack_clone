import React from 'react';
import './ChannelHeader.css';

class ChannelHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavsToggle = this.handleFavsToggle.bind(this);
  }

  handleFavsToggle() {
    const { navigate, match: { params }, rightSidebar } = this.props;

    if (rightSidebar && rightSidebar.sidebarType === 'Favorites') {
      this.props.closeRightSidebar();
      navigate({ path: `/${params.workspaceSlug}/${params.channelSlug}` });
    } else {
      this.props.openRightSidebar();
      navigate({ path: `/${params.workspaceSlug}/${params.channelSlug}/favorites` });
    }
  }

  render() {
    const { match: { params } } = this.props;
  
    return (
      <header className="ch-header">
        <h1 className="ch-header__name">{params.channelSlug}</h1>

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