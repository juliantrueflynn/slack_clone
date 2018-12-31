import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys } from 'humps';
import sampleWisdomQuote from '../util/wisdomQuotesUtil';
import EmptyDisplay from './EmptyDisplay';
import LeftSidebarContainer from './LeftSidebarContainer';
import { PageRoutes } from '../util/routeUtil';
import './Workspace.css';

class Workspace extends React.Component {
  componentDidMount() {
    const { workspaces, fetchWorkspacesRequest } = this.props;

    if (!workspaces || !workspaces.length) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      history,
      workspaces,
      isLoading,
      fetchWorkspacesRequest,
      chatPath,
      channel,
      workspace,
    } = this.props;

    const hasLoaded = !isLoading.workspace;

    if (hasLoaded && prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }

    if (match.isExact && channel && channel.workspaceSlug === workspace.slug) {
      history.replace(`/${workspace.slug}/messages/${chatPath}`);
    }
  }

  render() {
    const {
      isLoading,
      workspaceSlug,
      routes,
      channel,
      actionCablesChannels,
      onReceived,
    } = this.props;
    const { quoteText, quoteBy } = sampleWisdomQuote;
    const hasLoaded = !isLoading.workspace && channel;

    if (!hasLoaded) {
      return (
        <div className="Workspace Workspace--loading">
          <div className="LeftSidebar" />
          <EmptyDisplay topIcon="quote-left" hasLoadingIcon>
            <blockquote className="Workspace__quote">
              {quoteText}
              <footer>{`— ${quoteBy}`}</footer>
            </blockquote>
          </EmptyDisplay>
        </div>
      );
    }

    return (
      <div className="Workspace">
        <ActionCable
          channel={decamelizeKeys({ channel: 'WorkspaceChannel', workspaceSlug })}
          onReceived={onReceived}
        />
        <ActionCable
          channel={decamelizeKeys({ channel: 'AppearanceChannel', workspaceSlug })}
          onReceived={onReceived}
        />
        {actionCablesChannels.map(cable => (
          <ActionCable
            key={cable.channelSlug}
            channel={decamelizeKeys(cable)}
            onReceived={onReceived}
          />
        ))}
        {hasLoaded && <LeftSidebarContainer />}
        {hasLoaded && <PageRoutes routes={routes} />}
      </div>
    );
  }
}

export default Workspace;
