import React from 'react';
import './TopBarHeader.css';

class TopBarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleFavsToggle = this.handleFavsToggle.bind(this);
  }

  handleFavsToggle() {
    const { navigate, rightSidebar, ...props } = this.props;
    const { match: { params } } = props;
    const path = `/${params.workspaceSlug}/${params.channelSlug}`;

    if (rightSidebar && rightSidebar.sidebarType === 'Favorites') {
      props.closeRightSidebar();
      navigate(path);
    } else {
      props.openRightSidebar();
      navigate(`${path}/favorites`);
    }
  }

  render() {
    const { sectionTitle, ...props } = this.props;

    return (
      <header className="top-bar-header">
        <h1 className="top-bar-header__title">{sectionTitle}</h1>

        <div className="top-bar-subheader">{props.children}</div>

        <ul className="top-bar-menu">
          <li className="top-bar-menu__item">
            <button className="btn btn__favs" onClick={this.handleFavsToggle}>
              Favorites
            </button>
          </li>
        </ul>
      </header>
    );
  }
}

export default TopBarHeader;
