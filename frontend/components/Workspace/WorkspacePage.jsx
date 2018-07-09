import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../../util/routeUtil';
import LeftSidebarContainer from '../LeftSidebarContainer';
import './WorkspacePage.css';

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleReceived = this.handleReceived.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
  }

  componentDidMount() {
    const { workspaceSlug, workspaces } = this.props;
    this.props.fetchWorkspaceRequest(workspaceSlug);

    if (!workspaces || !workspaces.length) {
      this.props.fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const { workspaceSlug, workspaces, ...props } = this.props;

    if (prevProps.workspaceSlug !== workspaceSlug) {
      props.fetchWorkspaceRequest(workspaceSlug);
    }

    if (prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      props.fetchWorkspacesRequest();
    }
  }

  handleReceived(received) {
    this.props.actionCableReceive(received);
  }

  handleConnected() {
    this.workspaceChannel.perform('online');
  }

  render() {
    const { workspaceSlug, channels, ...props } = this.props;
    const defaultChannelSlug = channels[0] && channels[0].slug;

    if (props.isFetching) {
      return (<h2>Loading...</h2>);
    }

    if (props.match.isExact && defaultChannelSlug) {
      return (<Redirect to={`${workspaceSlug}/${defaultChannelSlug}`} />);
    }

    return (
      <div className={`single-workspace single-workspace__${workspaceSlug}`}>
        <LeftSidebarContainer />
        <PageRoutes routes={props.routes} />
        <ActionCable
          ref={(refs) => { this.workspaceChannel = refs; }}
          channel={{ channel: 'WorkspaceChannel', workspace_slug: workspaceSlug }}
          onReceived={this.handleReceived}
          onConnected={this.handleConnected}
        />
        {channels && channels.map(({ slug: channelSlug }) => (
          <ActionCable
            key={channelSlug}
            channel={{ channel: 'ChatChannel', channel_slug: channelSlug }}
            onReceived={this.handleReceived}
          />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;
