import React from 'react';
import { camelize } from 'humps';
import './RightSidebar.css';

class SidebarRight extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleCloseSidebar() {
    const { match: { params } } = this.props;
    this.props.closeRightSidebar();
    this.props.navigate(`/${params.workspaceSlug}/${params.channelSlug}`);
  }

  render() {
    const { isRightSidebarOpen, sidebarTitle } = this.props;
    const camelizedTitle = camelize(sidebarTitle);

    if (!isRightSidebarOpen) {
      return null;
    }

    return (
      <aside
        className={`sidebar__right sidebar__${camelizedTitle}`}
      >
        <header className="sidebar__header">
          <h4 className="sidebar__title">{sidebarTitle}</h4>
          <button className="btn btn__close" onClick={this.handleCloseSidebar}>
            &#10006;
          </button>
        </header>
        
        <div class="sidebar__body">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

export default SidebarRight;