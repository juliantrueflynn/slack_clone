import React from 'react';
import { Redirect } from 'react-router-dom';
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
      defaultChat,
      match: { url, isExact },
      isLoading,
      routes,
    } = this.props;
    const defaultChatSlug = defaultChat && defaultChat.slug;

    if (isLoading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    if (isExact && defaultChatSlug) {
      return <Redirect to={`${url}/messages/${defaultChatSlug}`} />;
    }

    return (
      routes.map(route => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))
    );
  }
}

export default WorkspacePage;
