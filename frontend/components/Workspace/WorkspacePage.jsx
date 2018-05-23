import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import NavBarContainer from '../Layout/NavBarContainer';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { location, workspaceRequest, match } = this.props;
    if (location.pathname === match.url) {
      workspaceRequest(match.params.workspaceSlug);
    }
  }

  componentDidUpdate(prevProps) {
    const { location, workspaceRequest, match } = this.props;
    if (location.pathname === match.url && prevProps.match.url !== match.url) {
      workspaceRequest(match.params.workspaceSlug);
    }
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={`workspaceRoute${i}`} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;