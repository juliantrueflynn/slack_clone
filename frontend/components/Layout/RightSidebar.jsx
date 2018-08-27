import React from 'react';
import { Redirect } from 'react-router-dom';
import { camelize } from 'humps';
import './RightSidebar.css';
import Button from '../Button';

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
      <aside className={`Sidebar Sidebar__right Sidebar__right--${sidebarClassName}`}>
        <header className="Sidebar__header">
          <div className="Sidebar__headings">
            {sidebarType && (
              <h4 className="Sidebar__title">
                {sidebarType}
              </h4>
            )}
            {sidebarSubtitle && (
              <span className="Sidebar__subtitle">
                {sidebarSubtitle}
              </span>
            )}
          </div>

          <Button buttonFor="close" onClick={this.handleCloseSidebar}>
            &#10006;
          </Button>
        </header>

        <div className="Sidebar__body">
          {props.children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
