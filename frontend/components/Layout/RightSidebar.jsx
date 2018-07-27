import React from 'react';
import { Redirect } from 'react-router-dom';
import { camelize } from 'humps';
import './RightSidebar.css';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarOpen: true };
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    const { rightSidebarOpen, sidebarType } = this.props;
    rightSidebarOpen(sidebarType);
  }

  componentDidUpdate(prevProps) {
    const { location, match: { isExact }, ...props } = this.props;

    if (isExact && location.pathname !== prevProps.location.pathname) {
      props.rightSidebarOpen(props.sidebarType);
    }
  }

  handleCloseSidebar() {
    const { rightSidebarClose } = this.props;
    this.setState({ isSidebarOpen: false });
    rightSidebarClose();
  }

  render() {
    const { sidebarType, sidebarSubtitle, ...props } = this.props;
    const { isSidebarOpen } = this.state;
    const sidebarClassName = camelize(sidebarType);

    if (!isSidebarOpen) {
      return (<Redirect to={`/${props.workspaceSlug}/${props.channelSlug}`} />);
    }

    return (
      <aside className={`sidebar__right sidebar__${sidebarClassName}`}>
        <header className="sidebar__header">
          <div className="sidebar__headings">
            {sidebarType && (
              <h4 className="sidebar__title">
                {sidebarType}
              </h4>
            )}
            {sidebarSubtitle && (
              <span className="sidebar__subtitle">
                {sidebarSubtitle}
              </span>
            )}
          </div>

          <button type="button" className="btn btn__close" onClick={this.handleCloseSidebar}>
            &#10006;
          </button>
        </header>

        <div className="sidebar__body">
          {props.children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
