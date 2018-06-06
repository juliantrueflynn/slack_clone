import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { WorkspaceActionCable } from '../../util/actionCableUtil';
import { RouteWithSubRoutes } from '../../util/routeUtil';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceRequest, match } = this.props;
    
    workspaceRequest(match.params.workspaceSlug);
  }

  componentDidUpdate(prevProps) {
    const { workspaceRequest, match } = this.props;
    
    if (prevProps.match.url !== match.url) {
      workspaceRequest(match.params.workspaceSlug);
    }
  }

  render() {
    const { match: { params }, routes } = this.props;

    return (
      <div className="workspace-view">
        <WorkspaceActionCable workspaceSlug={params.workspaceSlug} />
        
        {routes && routes.map((route, i) => (
          <RouteWithSubRoutes key={`channelRoute${i}`} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;