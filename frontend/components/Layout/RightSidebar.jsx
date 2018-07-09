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
    const { message, messageSlug, ...props } = this.props;

    if (props.match.isExact && props.location.pathname !== prevProps.location.pathname) {
      props.rightSidebarOpen(props.sidebarType);
    }
  }

  handleCloseSidebar() {
    this.setState({ isSidebarOpen: false });
    this.props.rightSidebarClose();
  }

  render() {
    const { sidebarType, sidebarSubtitle, ...props } = this.props;

    if (!this.state.isSidebarOpen) {
      return (<Redirect to={props.channelUrl} />);
    }

    return (
      <aside className={`sidebar__right sidebar__${camelize(sidebarType)}`}>
        <header className="sidebar__header">
          <div className="sidebar__headings">
            {sidebarType && (<h4 className="sidebar__title">{sidebarType}</h4>)}
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
          {props.children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
