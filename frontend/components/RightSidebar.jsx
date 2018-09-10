import React from 'react';
import Button from './Button';
import './RightSidebar.css';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const {
      isWorkspaceLoaded,
      rightSidebarOpen,
      sidebarType,
      sidebarProps,
      isOpen,
    } = this.props;

    if (isWorkspaceLoaded && !isOpen) {
      rightSidebarOpen(sidebarType, sidebarProps);
    }
  }

  handleClose() {
    const {
      rightSidebarClose,
      history,
      match: { params: { 0: chatPath, workspaceSlug } }
    } = this.props;

    rightSidebarClose();
    history.push(`/${workspaceSlug}/${chatPath}`);
  }

  render() {
    const { sidebarType, sidebarProps, children } = this.props;
    const sidebarSubtitle = sidebarProps && sidebarProps.subtitle;

    return (
      <aside className="RightSidebar">
        <header className="RightSidebar__header">
          <div className="RightSidebar__headings">
            {sidebarType && (
              <h4 className="RightSidebar__title">
                {sidebarType}
              </h4>
            )}
            {sidebarSubtitle && (
              <span className="RightSidebar__subtitle">
                {sidebarSubtitle}
              </span>
            )}
          </div>

          <Button unStyled buttonFor="close" onClick={this.handleClose}>
            &#10006;
          </Button>
        </header>

        <div className="RightSidebar__body">
          {children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
