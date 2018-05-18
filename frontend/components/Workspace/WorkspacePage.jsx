import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { Redirect } from 'react-router-dom';
import { ProtectedRoute, RouteWithSubRoutes } from '../../util/routeUtil';
import NavBarContainer from '../NavBarContainer';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isUserOnPage: false };
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