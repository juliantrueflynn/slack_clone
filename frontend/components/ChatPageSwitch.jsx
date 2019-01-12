import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import AllUnreads from './AllUnreads';
import AllThreads from './AllThreads';
import Channel from './Channel';
import { PageRoutes } from '../util/routeUtil';
import './ChatPageSwitch.css';

class ChatPageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInitLoadingDone: false };
  }

  componentDidMount() {
    const { updateChatPath } = this.props;

    updateChatPath();
    this.getChatData();
    this.updateHistoryDrawerPath();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact },
      updateChatPath,
      drawerType,
      closeDrawer,
      chatPath,
      chatroom,
      isLoading,
    } = this.props;

    if (chatPath !== prevProps.chatPath) {
      updateChatPath();

      if (chatroom && chatroom.shouldFetch) {
        this.getChatData();
      }

      if (!chatroom) {
        this.getChatData();
      }
    }

    if (chatroom && drawerType && isExact && !prevProps.isExact) {
      if (chatPath === prevProps.chatPath) {
        closeDrawer();
        return;
      }
    }

    this.updateHistoryDrawerPath();

    if (!isLoading.chatroom && prevProps.isLoading) {
      this.updateLoadingState();
    }
  }

  getChatData() {
    const { fetchChatPageData } = this.props;
    fetchChatPageData();
  }

  getDrawerRedirectPath() {
    const {
      match: { url, isExact },
      drawerType,
      drawerSlug,
      chatroom,
    } = this.props;

    if (isExact && drawerType === 'details' && !chatroom) {
      return null;
    }

    if (isExact && drawerType) {
      if (drawerSlug) {
        return `${url}/${drawerType}/${drawerSlug}`;
      }

      return `${url}/${drawerType}`;
    }

    return null;
  }

  updateHistoryDrawerPath() {
    const { history } = this.props;

    if (this.getDrawerRedirectPath()) {
      history.replace(this.getDrawerRedirectPath());
    }
  }

  updateLoadingState() {
    const { isInitLoadingDone } = this.state;

    if (!isInitLoadingDone) {
      this.setState({ isInitLoadingDone: true });
    }
  }

  render() {
    const {
      chatPath,
      routes,
      messages,
      users,
      chatroom,
      chatrooms,
      currentUser,
      isLoading,
      clearAllUnread,
      openModal,
      updateScrollLocation,
      fetchHistoryRequest,
      createChatroomSubRequest,
      createMessageRequest,
      match: { url, params: { workspaceSlug } },
    } = this.props;
    const { isInitLoadingDone } = this.state;

    let chatType = 'channel';
    if (chatPath === 'unreads' || chatPath === 'threads') {
      chatType = chatPath;
    }

    return (
      <div className={`ChatPageSwitch ChatPageSwitch__${chatType}`}>
        <ChannelHeaderContainer />
        <div className="ChatPageSwitch__row">
          <div className="ChatPageSwitch__body">
            {chatPath === 'unreads' && (
              <AllUnreads
                messagesMap={messages}
                users={users}
                isLoading={isLoading.chatroom}
                chatrooms={chatrooms}
                clearAllUnread={clearAllUnread}
              />
            )}
            {chatPath === 'threads' && (
              <AllThreads
                messages={messages}
                users={users}
                isLoading={isLoading.chatroom}
                currentUserSlug={currentUser.slug}
                workspaceSlug={workspaceSlug}
                createMessageRequest={createMessageRequest}
              />
            )}
            {chatroom && (
              <Channel
                messages={messages}
                isLoading={isLoading}
                chatroom={chatroom}
                currentUserSlug={currentUser.slug}
                openModal={openModal}
                fetchHistoryRequest={fetchHistoryRequest}
                createChatroomSubRequest={createChatroomSubRequest}
                createMessageRequest={createMessageRequest}
                updateScrollLocation={updateScrollLocation}
                matchUrl={url}
              />
            )}
          </div>
          {isInitLoadingDone && <PageRoutes routes={routes} />}
        </div>
      </div>
    );
  }
}

export default ChatPageSwitch;
