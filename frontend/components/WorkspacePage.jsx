import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../util/routeUtil';
import './WorkspacePage.css';

class WorkspacePage extends React.Component {
  componentDidMount() {
    const {
      workspaceSlug,
      workspaces,
      fetchWorkspaceRequest,
      fetchWorkspacesRequest,
    } = this.props;

    fetchWorkspaceRequest(workspaceSlug);

    if (!workspaces || !workspaces.length) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      workspaceSlug,
      workspaces,
      fetchWorkspaceRequest,
      fetchWorkspacesRequest,
    } = this.props;
    const { workspaces: prevWorkspaces } = prevProps;

    if (prevProps.workspaceSlug !== workspaceSlug) {
      fetchWorkspaceRequest(workspaceSlug);
    }

    if (prevWorkspaces && prevWorkspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }
  }

  render() {
    const {
      match: { url, isExact },
      channels,
      isLoading,
      routes,
      isRightSidebarOpen,
    } = this.props;
    const defaultChatSlug = channels[0] && channels[0].slug;

    if (isLoading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    if (isExact && defaultChatSlug) {
      return <Redirect to={`${url}/${defaultChatSlug}`} />;
    }

    let workspaceClassNames = 'WorkspacePage';
    if (isRightSidebarOpen) workspaceClassNames += ' WorkspacePage--sidebar-open';

    return (
      <div className={workspaceClassNames}>
        {routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;
