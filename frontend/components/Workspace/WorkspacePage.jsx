import React from 'react';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import Socket from '../../util/actionCableUtil';

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
    const { match: { params: { workspaceSlug } }, routes, channels } = this.props;

    return (
      <div className="workspace-view">
        <Socket channel={{ channel: 'WorkspaceChannel', workspaceSlug }} />

        {channels && channels.map(({ slug: channelSlug }) => (
          <Socket key={channelSlug} channel={{ channel: 'ChatChannel', channelSlug }} />
        ))}

        {routes && routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;
