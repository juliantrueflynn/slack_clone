import React from 'react';
import { Redirect } from 'react-router-dom';
import Socket from '../../util/actionCableUtil';
import LeftSidebarContainer from '../LeftSidebarContainer';
import './WorkspacePage.css';

class WorkspacePage extends React.Component {
  componentDidMount() {
    const { workspaceSlug, workspaces } = this.props;
    this.props.fetchWorkspaceRequest(workspaceSlug);

    if (!workspaces || !workspaces.length) {
      this.props.fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { workspaceSlug, workspaces } = this.props;

    if (prevProps.workspaceSlug !== workspaceSlug) {
      this.props.fetchWorkspaceRequest(workspaceSlug);
    }

    if (prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      this.props.fetchWorkspacesRequest();
    }
  }

  render() {
    const { workspaceSlug, channels, ...props } = this.props;

    if (props.isFetching) {
      return (<h2>Loading...</h2>);
    }

    if (props.isExactMatch) {
      return channels && channels.length && (
        <Redirect to={`/${workspaceSlug}/${channels[0].slug}`} />
      );
    }

    return (
      <div className={`single-workspace single-workspace__${workspaceSlug}`}>
        <Socket channel={{ channel: 'WorkspaceChannel', workspaceSlug }} />

        {channels && channels.map(({ slug: channelSlug }) => (
          <Socket key={channelSlug} channel={{ channel: 'ChatChannel', channelSlug }} />
        ))}

        <LeftSidebarContainer />

        {props.children}
      </div>
    );
  }
}

export default WorkspacePage;
