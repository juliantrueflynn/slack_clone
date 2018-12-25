import React from 'react';
import classNames from 'classnames';
import ScrollBar from './ScrollBar';
import PublicViewNavBar from './PublicViewNavBar';
import './PublicView.css';

class PublicView extends React.Component {
  constructor(props) {
    super(props);
    this.handleDdClick = this.handleDdClick.bind(this);
  }

  componentDidMount() {
    const { fetchWorkspacesRequest, isLoggedIn, workspacesMap } = this.props;
    const workspaces = Object.values(workspacesMap);

    if (isLoggedIn && (!workspaces || !workspaces.length)) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { workspacesMap, fetchWorkspacesRequest } = this.props;
    const workspaces = Object.values(workspacesMap);
    const prevWorkspaces = Object.values(prevProps.workspacesMap);
    const lastItem = workspaces[workspaces.length - 1];
    const prevLastItem = workspaces[prevWorkspaces.length - 1];

    if (lastItem && prevLastItem && lastItem.id !== prevLastItem.id) {
      fetchWorkspacesRequest();
    }
  }

  handleDdClick(e) {
    const { openDropdown } = this.props;
    const { bottom: posY, right: posX } = e.target.getBoundingClientRect();

    openDropdown('DROPDOWN_PUBLIC', { posY, posX });
  }

  render() {
    const {
      isLoggedIn,
      signOutRequest,
      workspacesMap,
      subbedWorkspaces,
      openModal,
      closeDropdown,
      location: { pathname },
      render,
    } = this.props;

    const pagePath = pathname.length > 1 ? pathname.slice(1) : 'home';
    const workspaces = Object.values(workspacesMap);

    const pageClassNames = classNames('PublicView', {
      [`PublicView__${pagePath}`]: pagePath,
      'PublicView--signed-in': isLoggedIn,
      'PublicView--signed-out': !isLoggedIn,
    });

    return (
      <div className={pageClassNames}>
        <ScrollBar>
          <PublicViewNavBar
            openDropdown={this.handleDdClick}
            closeDropdown={closeDropdown}
            subbedWorkspaces={subbedWorkspaces}
            openModal={openModal}
            isLoggedIn={isLoggedIn}
            signOutRequest={signOutRequest}
          />
          {render({ workspaces, openModal })}
        </ScrollBar>
      </div>
    );
  }
}

export default PublicView;
