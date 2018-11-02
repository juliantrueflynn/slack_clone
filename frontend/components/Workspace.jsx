import React from 'react';
import { Switch } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys } from 'humps';
import classNames from 'classnames';
import { RouteWithSubRoutes } from '../util/routeUtil';
import LeftSidebarContainer from './LeftSidebarContainer';
import ReactionModal from './ReactionModal';
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
      match: { isExact, url },
      history,
      workspaces,
      isLoading,
      fetchWorkspacesRequest,
    } = this.props;

    const hasLoaded = !isLoading;
    if (hasLoaded && prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }

    const defaultChat = this.getDefaultChat();
    if (isExact && defaultChat) {
      history.replace(`${url}/messages/${defaultChat.slug}`);
    }
  }

  getDefaultChat() {
    const { entity: workspace, channels } = this.props;

    if (workspace) {
      const firstChatSlug = workspace.channels[0];
      return channels[firstChatSlug];
    }

    return null;
  }

  render() {
    const {
      entitySlug: workspaceSlug,
      isLoading,
      routes,
      modal,
      modalClose,
      createReactionRequest,
      channels,
      currChatSlug,
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
    const cableChannels = Object.values(channels).filter(ch => (
      ch.isSub || ch.slug === currChatSlug
    )).map(channel => (
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
            {modal.modalType === 'MODAL_REACTION' && (
              <ReactionModal
                modalProps={modal.modalProps}
                modalClose={modalClose}
                createReactionRequest={createReactionRequest}
              />
            )}
            {childRoutes}
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
