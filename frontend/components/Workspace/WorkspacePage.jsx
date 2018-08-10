import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { Redirect } from 'react-router-dom';
import { decamelizeKeys } from 'humps';
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

  handleReceived(received) {
    const { membersSlugs, currentUser: { slug }, ...props } = this.props;
    if (membersSlugs.includes(slug) && props.subsHash[slug]) {
      props.actionCableReceive(received);
    }
  }

  handleConnected() {
    this.workspaceChat.perform('online');
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
      return (<Redirect to={defaultChannelUrl} />);
    }

    return (
      <div className="Page Page__workspace">
        <LeftSidebarContainer />
        <PageRoutes routes={routes} />
        <ActionCable
          ref={(refs) => { this.workspaceChat = refs; }}
          channel={decamelizeKeys({ channel: 'WorkspaceChannel', workspaceSlug })}
          onReceived={this.handleReceived}
          onConnected={this.handleConnected}
        />
        {channels && channels.map(({ id, slug: channelSlug }) => (
          <ActionCable
            key={id}
            channel={decamelizeKeys({ channel: 'ChatChannel', channelSlug })}
            onReceived={this.handleReceived}
          />
        ))}
      </div>
    );
  }
}

export default WorkspacePage;
