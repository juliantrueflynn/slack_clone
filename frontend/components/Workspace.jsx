import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys } from 'humps';
import sampleWisdomQuote from '../util/wisdomQuotesUtil';
import EmptyDisplay from './EmptyDisplay';
import LeftSidebarContainer from './LeftSidebarContainer';
import ProfileModal from './ProfileModal';
import ChatModal from './ChatModal';
import ChatsModal from './ChatsModal';
import ChannelEditorModal from './ChannelEditorModal';
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
      match: { isExact, url },
      history,
      workspaces,
      isLoading,
      fetchWorkspacesRequest,
    } = this.props;

    const hasLoaded = !isLoading.workspace;
    if (hasLoaded && prevProps.workspaces && prevProps.workspaces.length !== workspaces.length) {
      fetchWorkspacesRequest();
    }

    const defaultChat = this.getDefaultChat();
    if (isExact && defaultChat) {
      history.replace(`${url}/messages/${defaultChat.slug}`);
    }
  }

  getDefaultChat() {
    const { workspace, channelsMap } = this.props;

    if (workspace) {
      const firstChatSlug = workspace.channels[0];
      return channelsMap[firstChatSlug];
    }

    return null;
  }

  render() {
    const {
      workspace,
      workspaceSlug,
      isLoading,
      routes,
      modalType,
      closeModal,
      channelsMap,
      chatPath,
      users,
      currentUser,
      fetchChannelsRequest,
      onReceived,
    } = this.props;

    const { quoteText, quoteBy } = sampleWisdomQuote;

    if (isLoading.workspace) {
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

    const user = users[currentUser.slug];
    const channel = channelsMap[chatPath];
    const defaultChat = this.getDefaultChat();
    const channels = Object.values(channelsMap);
    const cableChannels = channels.filter(ch => ch.isSub || ch.slug === chatPath).map(ch => (
      { channel: 'ChatChannel', channelSlug: ch.slug }
    ));

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
        {cableChannels.map(cable => (
          <ActionCable
            key={cable.channelSlug}
            channel={decamelizeKeys(cable)}
            onReceived={onReceived}
          />
        ))}
        {workspace && defaultChat && <LeftSidebarContainer />}
        {modalType === 'MODAL_CHAT' && (
          <ChatModal workspaceId={workspace.id} closeModal={closeModal} />
        )}
        {modalType === 'MODAL_CHATS' && (
          <ChatsModal
            workspaceSlug={workspaceSlug}
            channels={channels}
            fetchChannelsRequest={fetchChannelsRequest}
            closeModal={closeModal}
          />
        )}
        {modalType === 'MODAL_PROFILE' && <ProfileModal {...user} closeModal={closeModal} />}
        {modalType === 'MODAL_EDIT_CHANNEL' && (
          <ChannelEditorModal
            channel={channel}
            currentUserSlug={currentUser.slug}
            closeModal={closeModal}
          />
        )}
        {defaultChat && <PageRoutes routes={routes} />}
      </div>
    );
  }
}

export default Workspace;
