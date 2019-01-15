import React from 'react';
import classNames from 'classnames';
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
    const { updateChatPath, fetchChatPageData } = this.props;

    updateChatPath();
    fetchChatPageData();
    this.updateHistoryDrawerPath();
  }

  componentDidUpdate(prevProps) {
    const {
      match: { isExact },
      updateChatPath,
      fetchChatPageData,
      drawerPath,
      closeDrawer,
      chatPath,
      chatroom,
      isLoading,
    } = this.props;

    if (chatPath !== prevProps.chatPath) {
      updateChatPath();

      if (chatroom && chatroom.shouldFetch) {
        fetchChatPageData();
      }

      if (!chatroom) {
        fetchChatPageData();
      }
    }

    if (chatroom && drawerPath && isExact && !prevProps.isExact) {
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

  updateHistoryDrawerPath() {
    const {
      history,
      drawerPath,
      match: { isExact, url },
    } = this.props;

    if (drawerPath && isExact) {
      history.replace(url + drawerPath);
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

    const pageClassNames = classNames('ChatPageSwitch', {
      [`ChatPageSwitch__${chatType}`]: chatType,
      'ChatPageSwitch__channel--dm': chatroom && chatroom.hasDm,
      'ChatPageSwitch__channel--public': chatroom && !chatroom.hasDm,
    });

    return (
      <div className={pageClassNames}>
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
