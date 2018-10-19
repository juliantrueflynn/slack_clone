import React from 'react';
import { Switch } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys } from 'humps';
import classNames from 'classnames';
import { RouteWithSubRoutes } from '../util/routeUtil';
import LeftSidebarContainer from './LeftSidebarContainer';
import EmojiModal from './EmojiModal';
import './Workspace.css';

class Workspace extends React.Component {
  componentDidMount() {
    const {
      workspaceSlug,
      workspaces,
      fetchWorkspaceRequest,
      fetchWorkspacesRequest,
    } = this.props;

    fetchWorkspaceRequest(workspaceSlug);

    if (!workspaces || !workspaces.length) {
      fetchWorkspacesRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact, url },
      history,
      workspaceSlug,
      workspaces,
      fetchWorkspaceRequest,
      fetchWorkspacesRequest,
    } = this.props;

    if (prevProps.workspaceSlug !== workspaceSlug) {
      fetchWorkspaceRequest(workspaceSlug);
    }

    if (prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }

    const defaultChat = this.getDefaultChat();
    if (isExact && defaultChat) {
      history.replace(`${url}/messages/${defaultChat.slug}`);
    }
  }

  getDefaultChat() {
    const { workspaceSlug, workspaces, channels } = this.props;

    const workspace = workspaces[workspaceSlug];
    if (workspace) {
      const firstChatSlug = workspace.channels[0];
      return channels[firstChatSlug];
    }

    return null;
  }

  render() {
    const {
      workspaceSlug,
      isLoading,
      routes,
      modal,
      modalClose,
      createReactionRequest,
      channels,
      onReceived,
    } = this.props;

    if (isLoading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    const defaultChat = this.getDefaultChat();
    const cableChannels = Object.values(channels).filter(ch => ch.isSub).map(channel => (
      { channel: 'ChatChannel', channelSlug: channel.slug }
    ));

    const pageClassNames = classNames('Workspace', {
      'Workspace--loading': isLoading,
      'Workspace--modal-open': modal.modalType,
    });

    const childRoutes = defaultChat && !isLoading && (
      <Switch>
        {routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)}
      </Switch>
    );

    return (
      <div className={pageClassNames}>
        <ActionCable channel={decamelizeKeys({ channel: 'WorkspaceChannel', workspaceSlug })} onReceived={onReceived} />
        <ActionCable channel={decamelizeKeys({ channel: 'AppearanceChannel', workspaceSlug })} onReceived={onReceived} />
        {cableChannels.map(cable => (
          <ActionCable
            key={cable.channelSlug}
            channel={decamelizeKeys(cable)}
            onReceived={onReceived}
          />
        ))}

        {defaultChat && (<LeftSidebarContainer />)}
        <div className="Workspace__col">
          <div className="Workspace__chat">
            <EmojiModal
              modal={modal}
              modalClose={modalClose}
              createReactionRequest={createReactionRequest}
            />
            {childRoutes}
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
