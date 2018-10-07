import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '../util/routeUtil';
import LeftSidebarContainer from './LeftSidebarContainer';
import EmojiModal from './EmojiModal';
import ChannelHeader from './ChannelHeader';
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

    const { workspaces: prevWorkspaces } = prevProps;

    if (prevProps.workspaceSlug !== workspaceSlug) {
      fetchWorkspaceRequest(workspaceSlug);
    }

    if (prevWorkspaces && prevWorkspaces.length !== workspaces.length) {
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
      isLoading,
      routes,
      modal,
      modalClose,
      createReactionRequest,
      channels,
      drawerType,
      drawerClose,
    } = this.props;

    if (isLoading) {
      return (
        <h2>
          Loading...
        </h2>
      );
    }

    const defaultChat = this.getDefaultChat();

    let classNames = 'Workspace';
    if (isLoading) classNames += 'Workspace--loading';
    if (modal.modalType) classNames += ' Workspace--modal-open';

    return (
      <div className={classNames}>
        <LeftSidebarContainer />
        <div className="Workspace__col">
          <ChannelHeader
            channels={channels}
            drawerClose={drawerClose}
            drawerType={drawerType}
          />
          <div className="Workspace__chat">
            <EmojiModal
              modal={modal}
              modalClose={modalClose}
              createReactionRequest={createReactionRequest}
            />
            {defaultChat && (
              <Switch>
                {routes.map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
