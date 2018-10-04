import React from 'react';
import { RouteWithSubRoutes } from '../util/routeUtil';
import LeftSidebarContainer from './LeftSidebarContainer';
import EmojiModal from './EmojiModal';
import './Workspace.css';
import ChannelHeader from './ChannelHeader';

class WorkspacePage extends React.Component {
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
      channels,
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

    const workspace = workspaces[workspaceSlug];
    if (isExact && workspace) {
      const firstChatSlug = workspace.channels[0];
      const defaultChatSlug = channels[firstChatSlug] && channels[firstChatSlug].slug;

      if (defaultChatSlug) {
        history.replace(`${url}/messages/${defaultChatSlug}`);
      }
    }
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
            {routes.map(route => (
              <RouteWithSubRoutes key={route.path} {...route} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkspacePage;
