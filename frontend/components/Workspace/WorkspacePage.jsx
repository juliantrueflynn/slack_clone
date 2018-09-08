import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../../util/routeUtil';
import LeftSidebarContainer from '../LeftSidebarContainer';
import './WorkspacePage.css';

class WorkspacePage extends React.Component {
  componentDidMount() {
    const { workspaceSlug, workspaces, ...props } = this.props;
    props.fetchWorkspaceRequest(workspaceSlug);
    if (!workspaces || !workspaces.length) props.fetchWorkspacesRequest();
  }

  componentDidUpdate(prevProps) {
    const { workspaceSlug, workspaces, ...props } = this.props;
    if (prevProps.workspaceSlug !== workspaceSlug) props.fetchWorkspaceRequest(workspaceSlug);
    if (prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      props.fetchWorkspacesRequest();
    }
  }

  render() {
    const {
      workspaceSlug,
      channels,
      match: { isExact },
      routes,
      isLoading,
    } = this.props;
    const defaultChannelSlug = channels[0] && channels[0].slug;
    const defaultChannelUrl = `${workspaceSlug}/${defaultChannelSlug}`;

    if (isLoading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    if (isExact && defaultChannelSlug) {
      return <Redirect to={defaultChannelUrl} />;
    }

    return (
      <div className="Page Page__workspace">
        <LeftSidebarContainer />
        <PageRoutes routes={routes} />
      </div>
    );
  }
}

export default WorkspacePage;
