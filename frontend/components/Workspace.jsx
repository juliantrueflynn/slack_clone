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
      workspace,
      workspaceSlug,
      routes,
      modalType,
      closeModal,
      channels,
      channel,
      chatPath,
      users,
      currentUser,
      fetchChannelsRequest,
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

    const user = users[currentUser.slug];
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
        {hasLoaded && <LeftSidebarContainer />}
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
        {hasLoaded && <PageRoutes routes={routes} />}
      </div>
    );
  }
}

export default Workspace;
