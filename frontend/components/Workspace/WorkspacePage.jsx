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
    const { workspaceSlug, workspaces } = this.props;
    this.props.fetchWorkspaceRequest(workspaceSlug);
    if (!workspaces || !workspaces.length) this.props.fetchWorkspacesRequest();
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
    const { workspaceSlug, channels, ...props } = this.props;
    const defaultChannelSlug = channels[0] && channels[0].slug;

    if (props.isLoading) return (<h2>Loading...</h2>);

    if (props.match.isExact && defaultChannelSlug) {
      return (<Redirect to={`${workspaceSlug}/${defaultChannelSlug}`} />);
    }

    return (
      <div className={`single-workspace single-workspace__${workspaceSlug}`}>
        <LeftSidebarContainer />
        <PageRoutes routes={props.routes} />
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
