import React from 'react';
import classNames from 'classnames';
import ScrollBar from './ScrollBar';
import PublicViewNavBar from './PublicViewNavBar';
import './PublicView.css';

class PublicView extends React.Component {
  componentDidMount() {
    const { fetchWorkspacesRequest, isLoggedIn, workspaces } = this.props;

    if (isLoggedIn && (!workspaces || !workspaces.length)) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { workspaces, fetchWorkspacesRequest } = this.props;
    const prevWorkspaces = prevProps.workspaces;

    const lastItem = workspaces[workspaces.length - 1];
    const prevLastItem = workspaces[prevWorkspaces.length - 1];

    if (lastItem && prevLastItem && lastItem.id !== prevLastItem.id) {
      fetchWorkspacesRequest();
    }
  }

  render() {
    const {
      location: { pathname },
      isLoggedIn,
      fetchWorkspacesRequest,
      workspaces,
      workspacesMap,
      openModal,
      render,
      ...props
    } = this.props;

    const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';

    const pageClassNames = classNames('PublicView', {
      [`PublicView__${pagePath}`]: pagePath,
      'PublicView--signed-in': isLoggedIn,
      'PublicView--signed-out': !isLoggedIn,
    });

    return (
      <div className={pageClassNames}>
        <ScrollBar>
          <PublicViewNavBar openModal={openModal} isLoggedIn={isLoggedIn} {...props} />
          {render({ workspaces, openModal })}
        </ScrollBar>
      </div>
    );
  }
}

export default PublicView;
