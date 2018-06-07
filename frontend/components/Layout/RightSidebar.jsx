import React from 'react';
import { camelize } from 'humps';
import './RightSidebar.css';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  handleCloseSidebar() {
    const { match: { params }, navigate, closeRightSidebar } = this.props;
    closeRightSidebar();
    navigate({ path: `/${params.workspaceSlug}/${params.channelSlug}` });
  }

  render() {
    const { isRightSidebarOpen, sidebarTitle, sidebarSubtitle } = this.props;
    const camelizedTitle = camelize(sidebarTitle);

    if (!isRightSidebarOpen) {
      return null;
    }

    return (
      <aside
        className={`sidebar__right sidebar__${camelizedTitle}`}
      >
        <header className="sidebar__header">
          <div className="sidebar__headings">
            {sidebarTitle && (
              <h4 className="sidebar__title">{sidebarTitle}</h4>
            )}
            {sidebarSubtitle && (
              <span className="sidebar__subtitle">
                <small>{sidebarSubtitle}</small>
              </span>
            )}
          </div>
          
          <button className="btn btn__close" onClick={this.handleCloseSidebar}>
            &#10006;
          </button>
        </header>
        
        <div className="sidebar__body">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;