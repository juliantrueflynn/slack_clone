import React from 'react';
import ChannelPageContainer from '../Channel/ChannelPageContainer';
import { ProtectedRoute, RouteWithSubRoutes } from '../../util/routeUtil';
import NavBarContainer from '../NavBarContainer';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceRequest, match: { params }} = this.props;
    workspaceRequest(params.workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const slug = this.props.match.params.workspaceSlug;
    const nextSlug = nextProps.match.params.workspaceSlug;
    if (slug !== nextSlug) {
      this.props.workspaceRequest(nextSlug);
    }
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;