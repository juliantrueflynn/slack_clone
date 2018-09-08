import React from 'react';
import { Redirect } from 'react-router-dom';
import { camelize } from 'humps';
import Button from './Button';
import './RightSidebar.css';

class RightSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarOpen: true };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { rightSidebarOpen, sidebarType } = this.props;
    rightSidebarOpen(sidebarType);
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      rightSidebarOpen,
      sidebarType,
      match: { isExact },
    } = this.props;

    if (isExact && location.pathname !== prevProps.location.pathname) {
      rightSidebarOpen(sidebarType);
    }
  }

  handleClose() {
    const { rightSidebarClose } = this.props;
    this.setState({ isSidebarOpen: false });
    rightSidebarClose();
  }

  render() {
    const { sidebarType, sidebarSubtitle, ...props } = this.props;
    const { isSidebarOpen } = this.state;
    const sidebarClassName = camelize(sidebarType);

    if (!isSidebarOpen) {
      return <Redirect to={`/${props.workspaceSlug}/${props.channelSlug}`} />;
    }

    return (
      <aside className={`RightSidebar RightSidebar--${sidebarClassName}`}>
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
          {props.children}
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
