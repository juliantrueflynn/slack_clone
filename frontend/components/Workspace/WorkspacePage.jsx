import React from 'react';
import { WorkspaceActionCable, ChannelActionCables } from '../../util/actionCableUtil';
import { RouteWithSubRoutes } from '../../util/routeUtil';

class WorkspacePage extends React.Component {
  componentDidMount() {
    const { fetchWorkspaceRequest, match, workspaces } = this.props;
    fetchWorkspaceRequest(match.params.workspaceSlug);

    if (!workspaces || !workspaces.length) {
      this.props.fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchWorkspaceRequest, match, workspaces } = this.props;

    if (prevProps.match.url !== match.url) {
      fetchWorkspaceRequest(match.params.workspaceSlug);
    }

    if (prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      this.props.fetchWorkspacesRequest();
    }
  }

  render() {
    const { match: { params }, routes } = this.props;

    return (
      <div className="workspace-view">
        <WorkspaceActionCable workspaceSlug={params.workspaceSlug} />
        <ChannelActionCables />

        {routes && routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;
