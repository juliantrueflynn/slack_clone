import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys } from 'humps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sampleWisdomQuote from '../util/wisdomQuotesUtil';
import LeftSidebarContainer from './LeftSidebarContainer';
import ProfileModal from './ProfileModal';
import ChatModal from './ChatModal';
import ChatsModal from './ChatsModal';
import ChannelEditorModal from './ChannelEditorModal';
import './Workspace.css';
import Layout from './Layout';

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
      entity: workspace,
      entitySlug: workspaceSlug,
      isLoading,
      routes,
      modalType,
      modalClose,
      channels: channelsMap,
      currChatSlug,
      users,
      currentUser,
      fetchChannelsRequest,
      onReceived,
    } = this.props;

    const { quoteText, quoteBy } = sampleWisdomQuote;

    if (isLoading) {
      return (
        <Layout layoutFor="workspace" isLoading>
          <div className="LeftSidebar" />
          <div className="Layout__col">
            <span className="Workspace__brand-icon fa-layers fa-fw">
              <FontAwesomeIcon icon="square" className="Workspace__square-icon" />
              <FontAwesomeIcon icon="quote-left" inverse transform="shrink-7" />
            </span>
            <blockquote className="Workspace__quote">
              <p>{quoteText}</p>
              <footer>{`— ${quoteBy}`}</footer>
            </blockquote>
            <FontAwesomeIcon icon="spinner" spin pulse size="3x" />
          </div>
        </Layout>
      );
    }

    const user = users[currentUser.slug];
    const channel = channelsMap[currChatSlug];
    const defaultChat = this.getDefaultChat();
    const channels = Object.values(channelsMap);
    const cableChannels = channels.filter(ch => ch.isSub || ch.slug === currChatSlug).map(ch => (
      { channel: 'ChatChannel', channelSlug: ch.slug }
    ));
    const childRoutes = defaultChat && routes;

    return (
      <Layout layoutFor="workspace" routes={childRoutes}>
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
        {defaultChat && <LeftSidebarContainer />}
        {workspace && modalType === 'MODAL_CHAT' && (
          <ChatModal workspaceId={workspace.id} modalClose={modalClose} />
        )}
        {defaultChat && modalType === 'MODAL_CHATS' && (
          <ChatsModal
            workspaceSlug={workspaceSlug}
            channels={channels}
            fetchChannelsRequest={fetchChannelsRequest}
            modalClose={modalClose}
          />
        )}
        {user && modalType === 'MODAL_PROFILE' && (
          <ProfileModal {...user} modalClose={modalClose} />
        )}
        {channel && modalType === 'MODAL_EDIT_CHANNEL' && (
          <ChannelEditorModal channel={channel} currentUser={currentUser} modalClose={modalClose} />
        )}
      </Layout>
    );
  }
}

export default Workspace;
